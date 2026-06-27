import { getPermalink, getBlogPermalink } from './utils/permalinks';

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
      text: 'WhatsApp',
      href: 'https://wa.me/60123456789', // Put your agency's phone number here
      target: '_blank',
    }
  ],
};

export const footerData = {
  links: [
    {
      title: 'Website Packages',
      links: [
        { text: 'Starter Plan (RM199/bln)', href: getPermalink('/#pricing') },
        { text: 'Growth Plan (RM299/bln)', href: getPermalink('/#pricing') },
        { text: 'Custom Enterprise', href: getPermalink('/#pricing') },
      ],
    },
    {
      title: 'Agensi',
      links: [
        { text: 'Tentang Team', href: getPermalink('/#team') },
        { text: 'Soalan Lazim (FAQ)', href: getPermalink('/#faq') },
        { text: 'Hubungi Kami', href: 'https://wa.me/60123456789' },
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


