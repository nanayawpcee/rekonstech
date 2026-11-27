/**
 * Rekonstech service-request webhook (Google Apps Script).
 *
 * Receives the JSON the site POSTs to SERVICE_REQUEST_WEBHOOK_URL, appends each
 * lead to a Google Sheet and emails a notification.
 *
 * SETUP
 *  1. Create a Google Sheet (e.g. "Rekonstech Leads"), then Extensions > Apps Script.
 *  2. Replace the contents of Code.gs with this file and save.
 *  3. Project Settings (gear icon) > Script Properties > add:
 *       WEBHOOK_KEY   a long random string, e.g. from `openssl rand -hex 24`
 *       NOTIFY_EMAIL  where alerts go; separate several addresses with commas
 *  4. Run `testWebhook` once from the editor. Approve the permissions prompt
 *     (Sheets + send email). A test row and a test email should appear.
 *  5. Deploy > New deployment > type "Web app":
 *       Execute as:     Me
 *       Who has access: Anyone
 *     Copy the Web app URL (ends in /exec).
 *  6. In Vercel set SERVICE_REQUEST_WEBHOOK_URL to that URL plus the key:
 *       https://script.google.com/macros/s/XXXX/exec?key=YOUR_WEBHOOK_KEY
 *     then redeploy the site.
 *
 * After editing this script, publish via Deploy > Manage deployments > Edit >
 * Version: New version. That keeps the same URL; "New deployment" makes a new one.
 *
 * NOTE: Apps Script web apps always answer HTTP 200, so the site cannot tell a
 * rejected request (wrong key) from a stored one. Check the Sheet after setup.
 */

var SHEET_NAME = 'Leads';

var COLUMNS = [
  'Received (Accra)',
  'Reference',
  'Service',
  'Full name',
  'Phone',
  'Email',
  'Message',
  'Quote basket',
  'Status',
];

/** Keep in step with serviceCategoryOptions in src/content/site.content.ts. */
var SERVICE_LABELS = {
  'software-solutions': 'Software Solutions',
  'security-systems': 'Security Systems Installation',
  'networking-internet': 'Networking & Internet Services',
  'sales-supply': 'Sales & Supply',
  'consultancy': 'Consultancy Services',
};

var LIMITS = { fullName: 120, phone: 30, email: 254, message: 1000, basket: 2000, reference: 40 };

function doPost(e) {
  var props = PropertiesService.getScriptProperties();
  var expectedKey = props.getProperty('WEBHOOK_KEY');

  if (!expectedKey || !e || !e.parameter || e.parameter.key !== expectedKey) {
    return json_({ ok: false, error: 'unauthorized' });
  }

  var data;
  try {
    data = JSON.parse(e.postData && e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'invalid json' });
  }
  if (!data || typeof data !== 'object') return json_({ ok: false, error: 'invalid body' });

  var lead = {
    reference: clean_(data.reference, LIMITS.reference),
    service: SERVICE_LABELS[data.serviceCategory] || clean_(data.serviceCategory, 60),
    fullName: clean_(data.fullName, LIMITS.fullName),
    phone: clean_(data.phone, LIMITS.phone),
    email: clean_(data.email, LIMITS.email),
    message: clean_(data.message, LIMITS.message),
    basket: clean_(data.basket, LIMITS.basket),
    receivedAt: parseDate_(data.receivedAt),
  };

  if (!lead.fullName || !lead.phone) return json_({ ok: false, error: 'missing fields' });

  // Serialise writes so two simultaneous submissions cannot collide on a row.
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = getSheet_();
    if (lead.reference && isDuplicate_(sheet, lead.reference)) {
      return json_({ ok: true, duplicate: true });
    }
    sheet.appendRow([
      lead.receivedAt,
      lead.reference,
      lead.service,
      lead.fullName,
      lead.phone,
      lead.email,
      lead.message,
      lead.basket,
      'New',
    ]);
  } finally {
    lock.releaseLock();
  }

  // The lead is already saved, so a mail failure must not fail the request.
  try {
    notify_(lead, props.getProperty('NOTIFY_EMAIL'));
  } catch (err) {
    console.error('Notification failed for ' + lead.reference + ': ' + err);
  }

  return json_({ ok: true });
}

/** Health check: opening the /exec URL in a browser should show {"ok":true}. */
function doGet() {
  return json_({ ok: true, service: 'rekonstech-leads' });
}

function getSheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    // Plain text, so phone numbers like +233... are not turned into numbers or formulas.
    sheet.getRange('B:I').setNumberFormat('@');
    sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm');
    sheet.setColumnWidth(7, 360);
    sheet.setColumnWidth(8, 360);
  }
  return sheet;
}

/** Guards against the site retrying a delivery that already landed. Checks recent rows only. */
function isDuplicate_(sheet, reference) {
  var last = sheet.getLastRow();
  if (last < 2) return false;
  var start = Math.max(2, last - 199);
  var refs = sheet.getRange(start, 2, last - start + 1, 1).getValues();
  for (var i = 0; i < refs.length; i++) {
    if (refs[i][0] === reference) return true;
  }
  return false;
}

function notify_(lead, recipients) {
  if (!recipients) return;

  var lines = [
    'New service request from the website.',
    '',
    'Reference: ' + (lead.reference || 'n/a'),
    'Service:   ' + lead.service,
    'Name:      ' + lead.fullName,
    'Phone:     ' + lead.phone,
    'Email:     ' + (lead.email || 'not given'),
    '',
  ];
  if (lead.message) lines.push('Message:', lead.message, '');
  if (lead.basket) lines.push('Quote basket:', lead.basket, '');
  lines.push('Sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl());

  var options = { name: 'Rekonstech Website' };
  if (isEmail_(lead.email)) options.replyTo = lead.email;

  MailApp.sendEmail(
    recipients,
    'New lead: ' + lead.service + ' (' + lead.fullName + ')',
    lines.join('\n'),
    options
  );
}

/**
 * Trims, caps length, strips control characters, and neutralises leading
 * = + - @ so a submission can never run as a spreadsheet formula.
 */
function clean_(value, max) {
  if (value === null || value === undefined) return '';
  var text = String(value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function parseDate_(value) {
  var date = value ? new Date(value) : new Date();
  return isNaN(date.getTime()) ? new Date() : date;
}

function isEmail_(value) {
  return typeof value === 'string' && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
}

function json_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/** Run from the editor to check the Sheet and email work before deploying. */
function testWebhook() {
  var key = PropertiesService.getScriptProperties().getProperty('WEBHOOK_KEY');
  if (!key) throw new Error('Set the WEBHOOK_KEY script property first.');

  var result = doPost({
    parameter: { key: key },
    postData: {
      contents: JSON.stringify({
        reference: 'REK-TEST-' + Date.now().toString(36).toUpperCase(),
        serviceCategory: 'networking-internet',
        fullName: 'Test Lead',
        phone: '+233 20 000 0000',
        email: 'test@example.com',
        message: 'Test submission from the Apps Script editor. Safe to delete.',
        receivedAt: new Date().toISOString(),
      }),
    },
  });
  console.log(result.getContent());
}
