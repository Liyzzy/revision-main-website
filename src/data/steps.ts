/**
 * The "How it works" steps shown on the homepage.
 *
 * Kept as data (not hardcoded in the markup) for the same reason as
 * projects.ts — you edit the words here, the layout stays untouched.
 *
 * Keep these SHORT. The whole point of this section is to make a
 * non-technical business owner feel like this is easy.
 */
export interface Step {
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    title: 'Message us on WhatsApp',
    description:
      'Tell us about your business. No forms, no meetings, no jargon. We reply with a straight answer on price and timeline.',
  },
  {
    title: 'We build your website',
    description:
      'Ready in 1–2 weeks. We handle the design, hosting and setup. All you send us is your photos, menu or business details.',
  },
  {
    title: 'You go live',
    description:
      'Your site goes online and starts bringing in customers. Need changes later? Just WhatsApp us — updates are included.',
  },
];
