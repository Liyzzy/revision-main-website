export interface Package {
    name: string;
    audience: string;
    price: number | string;
    period: string;
    features: string[];
    featured? : boolean;
    badge? : string;
    cta: string;
    ctaMessage: string;
}

export const packages: Package[] = [
  {
    name: 'Starter',
    audience: 'For your first real online presence',
    price: 199,
    period: 'per month, cancel anytime',
    features: [
      'Clean 1-page website',
      'WhatsApp enquiry button',
      'Looks right on every phone',
      'Basic SEO setup',
    ],
    cta: 'Start with Starter',
    ctaMessage: 'Hi Re-Vision Digital, I am interested in the Starter plan.',
  },
  {
    name: 'Growth',
    audience: 'For businesses ready to be found',
    price: 299,
    period: 'per month, cancel anytime',
    featured: true,
    badge: 'Most popular',
    features: [
      'Everything in Starter',
      'Up to 5 pages',
      'Contact form to your inbox',
      'Priority updates',
    ],
    cta: 'Choose Growth',
    ctaMessage: 'Hi Re-Vision Digital, I am interested in the Growth plan.',
  },
  {
    name: 'Custom Enterprise',
    audience: 'For bigger or unusual projects',
    price: "Let's talk",
    period: 'Custom quote, built around you',
    features: [
      'Unlimited pages',
      'Custom features and integrations',
      'Priority support',
    ],
    cta: 'Tell us your idea',
    ctaMessage: 'Hi Re-Vision Digital, I have a custom project in mind.',
  },
];