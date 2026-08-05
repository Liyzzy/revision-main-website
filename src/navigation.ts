import { getPermalink } from './utils/permalinks';

// ============================================================
// ONE PLACE to change your WhatsApp number.
// Format: country code + number, no +, no spaces, no dashes.
// Malaysia example: 011-1234 5678  ->  601112345678
// ============================================================
export const WHATSAPP_NUMBER = '60123456789'; // TODO: replace with the real business number

/**
 * Builds a wa.me link with an optional pre-filled message.
 * encodeURIComponent handles the spaces/punctuation so you never
 * have to hand-write %20 in a URL again.
 */
export const whatsappLink = (message = 'Hi Re-Vision Digital, saya berminat!') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Projects',
      href: getPermalink('/projects'),
    },
    {
      text: 'Packages and Prices',
      href: getPermalink('/pricing'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [
    {
      text: 'WhatsApp Us',
      href: whatsappLink(),
      target: '_blank',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Website Packages',
      links: [
        { text: 'Starter Plan (RM199/month)', href: getPermalink('/pricing') },
        { text: 'Growth Plan (RM299/month)', href: getPermalink('/pricing') },
        { text: 'Custom Enterprise', href: getPermalink('/pricing') },
      ],
    },
    {
      title: 'Agency',
      links: [
        { text: 'About Us', href: getPermalink('/about') },
        // The FAQ lives on the pricing page, so link to that anchor —
        // not /#faq, which was pointing at a section that doesn't exist.
        { text: 'FAQ', href: getPermalink('/pricing') + '#faq' },
        { text: 'Contact Us', href: getPermalink('/contact') },
      ],
    },
  ],
  // TODO: replace '#' with your real profile URLs once the accounts exist.
  // Any link still set to '#' is hidden in Footer.astro rather than rendered
  // as a dead link, so it's safe to leave these until you're ready.
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'TikTok', icon: 'tabler:brand-tiktok', href: '#' },
  ],
  footNote: `© 2026 Re-Vision Digital. All Rights Reserved.`,
};
