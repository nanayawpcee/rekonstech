/**
 * The flip-book that showcases the Software Solutions offering.
 *
 * Faces are paired into sheets: flipping a sheet reveals its back on the left
 * and the next sheet's front on the right, exactly like a printed spread.
 * On phones the same markup is flattened by CSS into a stack of paper pages.
 */

export type BookPageKind =
  | 'cover'
  | 'intro'
  | 'contents'
  | 'section-left'
  | 'section-right'
  | 'cta-left'
  | 'cta-right'
  | 'back';

export interface BookService {
  icon: string;
  title: string;
  desc: string;
  chips?: string[];
}

export interface BookPage {
  kind: BookPageKind;
  /** Printed page number, shown in the folio. */
  folio?: string;
  /** Folio caption opposite the page number. */
  label?: string;

  // cover / back
  kicker?: string;
  issue?: string;
  titleTop?: string;
  titleAccent?: string;
  sub?: string;

  // editorial pages
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  body?: string;
  pull?: string;
  num?: string;
  verb?: string;
  contents?: Array<{ no: string; title: string; page: string }>;
  services?: BookService[];
  points?: string[];
  cta?: { label: string; href: string };
  /** Standfirst line pinned above the folio. */
  meta?: string;
  note?: string;
  /** Interface mockup printed on the page: dashboard | website | monitoring. */
  mockup?: string;
}

export interface BookSheet {
  front: BookPage;
  back: BookPage;
}

const spread = (
  num: string,
  verb: string,
  heading: string,
  headingAccent: string,
  body: string,
  pull: string,
  meta: string,
  mockup: string,
  eyebrow: string,
  services: BookService[],
  note: string,
  folioLeft: string,
  folioRight: string,
): [BookPage, BookPage] => [
  {
    kind: 'section-left',
    num,
    verb,
    heading,
    headingAccent,
    body,
    pull,
    meta,
    mockup,
    folio: folioLeft,
    label: heading + ' ' + headingAccent,
  },
  {
    kind: 'section-right',
    eyebrow,
    services,
    note,
    folio: folioRight,
    label: heading + ' ' + headingAccent,
  },
];

const [webAppsLeft, webAppsRight] = spread(
  '01',
  'Build',
  'Custom Web',
  'Applications',
  'Off-the-shelf tools bend your business to fit them. We build the other way round — portals, dashboards and record systems shaped around the way your team already works.',
  'Built for your workflow, not the other way around.',
  'Typical delivery — 6 to 14 weeks',
  'dashboard',
  'What We Deliver',
  [
    {
      icon: 'monitor',
      title: 'Dashboards & Internal Portals',
      desc: 'Live operational views, approvals and reporting for the people who run the business day to day.',
      chips: ['Role-based access', 'Audit trails'],
    },
    {
      icon: 'file-check',
      title: 'Records & Booking Systems',
      desc: 'Replace spreadsheets and paper files with searchable, permissioned records your team can trust.',
    },
    {
      icon: 'network',
      title: 'Integrations',
      desc: 'We connect the systems you already pay for, so data stops being re-typed between them.',
      chips: ['REST', 'Payments', 'SMS & email'],
    },
  ],
  'Handed over with documentation, the repository and a training session for your team.',
  '03',
  '04',
);

const [websitesLeft, websitesRight] = spread(
  '02',
  'Attract',
  'Website Design',
  '& Development',
  'A website earns its keep or it is decoration. We design for your market, build for speed on mobile data, and wire every page to a measurable enquiry.',
  'Designed to be found. Built to convert.',
  'Typical delivery — 2 to 5 weeks',
  'website',
  'What We Build',
  [
    {
      icon: 'globe',
      title: 'Design Approved Before Build',
      desc: 'You click through the interface and sign it off before a single line of code is written.',
    },
    {
      icon: 'trending-up',
      title: 'Search & Performance Ready',
      desc: 'Semantic structure, fast loads and clean metadata — the groundwork search engines reward.',
      chips: ['Responsive', 'SEO-ready', 'Analytics'],
    },
    {
      icon: 'keyboard',
      title: 'Content You Control',
      desc: 'Edit copy, prices and images yourself. No support ticket to change a phone number.',
      chips: ['CMS'],
    },
  ],
  'Includes a content-editing walkthrough, so your team can keep the site current.',
  '05',
  '06',
);

const [supportLeft, supportRight] = spread(
  '03',
  'Sustain',
  'Maintenance',
  '& Support',
  'Software rots quietly — dependencies age, certificates lapse, backups silently stop. A maintenance plan keeps small problems from becoming expensive weekends.',
  'The quiet work that keeps launch day paying off.',
  'From a fixed monthly retainer',
  'monitoring',
  'What We Maintain',
  [
    {
      icon: 'shield-check',
      title: 'Security & Dependency Patching',
      desc: 'Framework and library updates applied and tested on a schedule, not after an incident.',
    },
    {
      icon: 'server',
      title: 'Backups & Tested Restores',
      desc: 'Automated backups are only worth what a restore proves. We test ours.',
      chips: ['Daily', 'Off-site'],
    },
    {
      icon: 'life-buoy',
      title: 'Monitoring & Response',
      desc: 'Uptime and error monitoring with a named engineer who already knows your system.',
      chips: ['SLA-backed'],
    },
  ],
  'Cover hours and response times are agreed in writing before the plan starts.',
  '07',
  '08',
);

export const softwareBook = {
  eyebrow: 'The Portfolio',
  title: 'Read the software',
  titleAccent: 'story, page by page.',
  copy: 'Three offerings, presented the way we would hand them to you across a desk. Flip through — or tap the contents to jump.',
  hint: 'Click the page edges, use the arrows, or press ← →',
  hintMobile: 'Tap or swipe the page to leaf through',

  /** One label per spread: state N = N sheets turned. */
  labels: [
    'Cover',
    'Welcome & Contents',
    'Custom Web Applications',
    'Website Design',
    'Maintenance & Support',
    'Start a Project',
    'Back Cover',
  ],

  sheets: <BookSheet[]>[
    {
      front: {
        kind: 'cover',
        kicker: 'EST. ACCRA — GHANA',
        issue: 'VOL. 01',
        titleTop: 'SOFTWARE',
        titleAccent: 'SOLUTIONS',
        sub: 'Custom web applications, business websites and the maintenance that keeps them running.',
      },
      back: {
        kind: 'intro',
        eyebrow: 'Welcome',
        heading: 'Software should fit',
        headingAccent: 'the business.',
        body: 'Most systems fail not because the code is wrong, but because nobody asked how the work actually happens. We start with your process, agree the scope in writing, and build in short cycles you can see.',
        points: [
          'Scope agreed before anyone writes code',
          'A live staging link from week one',
          'Repository, credentials and documentation handed over',
          'A maintenance plan sized to the system, not the invoice',
        ],
        folio: '01',
        label: 'Welcome',
      },
    },
    {
      front: {
        kind: 'contents',
        eyebrow: 'Contents',
        heading: 'What is inside',
        contents: [
          { no: '01', title: 'Custom Web Applications', page: '03' },
          { no: '02', title: 'Website Design & Development', page: '05' },
          { no: '03', title: 'Maintenance & Support', page: '07' },
          { no: '—', title: 'Start a Project', page: '09' },
        ],
        folio: '02',
        label: 'Contents',
      },
      back: webAppsLeft,
    },
    { front: webAppsRight, back: websitesLeft },
    { front: websitesRight, back: supportLeft },
    {
      front: supportRight,
      back: {
        kind: 'cta-left',
        eyebrow: 'Start a Project',
        heading: 'Let us build',
        headingAccent: 'your next chapter.',
        body: 'Tell us what you are trying to run, replace or automate. We will come back with an approach, a timeline and a written quote — no obligation.',
        folio: '09',
        label: 'Start a Project',
      },
    },
    {
      front: {
        kind: 'cta-right',
        eyebrow: 'Reach Us',
        heading: 'Talk to an engineer',
        cta: { label: 'Request a Free Scoping Call', href: '#request' },
        folio: '10',
        label: 'Contact',
      },
      back: {
        kind: 'back',
        titleTop: 'rekonstech',
        sub: 'Software · Security · Networking · Supply · Consultancy',
      },
    },
  ],
};
