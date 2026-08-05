import type { ImageMetadata } from 'astro';

export interface CallToAction {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  text?: string;
  href?: string;
  target?: string;
  icon?: string;
  class?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface Hero {
  id?: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  content?: string;
  actions?: CallToAction[] | string;
  image?: { src: ImageMetadata | string; alt?: string } | string;
  bg?: string;
}
