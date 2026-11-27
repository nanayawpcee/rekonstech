/**
 * Fixed set of messages the no-JavaScript form round-trip can show.
 *
 * The redirect carries only a short code (`?error=phone`), never the message
 * text itself, so a crafted link cannot make the site display arbitrary words.
 * Messages for name, phone, category and email mirror the DTO's validation
 * messages so the filter can map one to the other.
 */
export const FORM_ERRORS = {
  name: 'Please enter your full name.',
  phone: 'Please enter a valid phone number.',
  category: 'Please choose a service category.',
  email: 'Please enter a valid email address.',
  message: 'Your message is too long. Please keep it under 1,000 characters.',
  basket: 'Your quote list is too long. Please remove a few items and try again.',
  generic: 'Please check your details and try again.',
} as const;

export type FormErrorCode = keyof typeof FORM_ERRORS;

/** Maps a class-validator message (or property name) to a code for the redirect. */
export function codeForValidationMessage(message: string | undefined): FormErrorCode {
  if (!message) return 'generic';
  const exact = (Object.keys(FORM_ERRORS) as FormErrorCode[]).find(
    (code) => FORM_ERRORS[code] === message,
  );
  if (exact) return exact;
  // Default class-validator messages start with the property name, e.g. "message must be shorter…".
  if (message.startsWith('message ')) return 'message';
  if (message.startsWith('basket ')) return 'basket';
  return 'generic';
}

/** Resolves `?error=` back to display text. Unknown values show nothing. */
export function formErrorMessage(code: unknown): string | undefined {
  if (typeof code !== 'string' || !Object.prototype.hasOwnProperty.call(FORM_ERRORS, code)) {
    return undefined;
  }
  return FORM_ERRORS[code as FormErrorCode];
}
