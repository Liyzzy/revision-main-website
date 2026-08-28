import { packages } from './packages';

// ============================================================
// ONE PLACE to change the contact form's Web3Forms key.
//
// Setup, about two minutes:
//   1. Go to https://web3forms.com
//   2. Enter the inbox you want enquiries delivered to
//   3. They email you an access key. Paste it below.
//
// No account, no password, no billing. Free tier is unlimited
// submissions, which is more than enough.
//
// This key is SAFE to commit to git. Web3Forms access keys are
// designed to sit in public HTML. A key only ever delivers to the
// address it was registered with, so someone copying it out of
// your page source can send you mail and nothing else. They can't
// read past submissions or redirect future ones.
// ============================================================
export const WEB3FORMS_ACCESS_KEY = 'YOUR-ACCESS-KEY-HERE';

/** False while the placeholder above is still in place. The form uses this to
 *  warn you in dev instead of failing silently in production. */
export const isAccessKeyConfigured =
  WEB3FORMS_ACCESS_KEY.length > 0 && WEB3FORMS_ACCESS_KEY !== 'YOUR-ACCESS-KEY-HERE';

/** What lands in your inbox as the email subject line. */
export const FORM_SUBJECT = 'New website enquiry from re-vision digital';

/**
 * Options for the "which package" dropdown.
 *
 * Derived from packages.ts rather than retyped, so renaming a plan or adding a
 * fourth one updates the form automatically. "Not sure yet" is the default on
 * purpose: a required choice between three plans the visitor hasn't read yet is
 * a reason to close the tab, and "not sure" is still a lead.
 */
export const packageOptions: string[] = ['Not sure yet', ...packages.map((p) => p.name)];
