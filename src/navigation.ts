import { getPermalink } from './utils/permalinks';

export const WHATSAPP_NUMBER = '60178522267';

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

        { text: 'FAQ', href: getPermalink('/pricing') + '#faq' },
        { text: 'Contact Us', href: getPermalink('/contact') },
      ],
    },
  ],

  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'TikTok', icon: 'tabler:brand-tiktok', href: '#' },
  ],
  footNote: `© 2026 Re-Vision Digital. All Rights Reserved.`,
};
