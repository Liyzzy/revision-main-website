import { packages } from './packages';

// Free key from https://web3forms.com — enter your inbox, they email it to you.
export const WEB3FORMS_ACCESS_KEY = 'YOUR-ACCESS-KEY-HERE';

export const isAccessKeyConfigured =
  WEB3FORMS_ACCESS_KEY.length > 0 && WEB3FORMS_ACCESS_KEY !== 'YOUR-ACCESS-KEY-HERE';

export const FORM_SUBJECT = 'New website enquiry from re-vision digital';

export const packageOptions: string[] = ['Not sure yet', ...packages.map((p) => p.name)];
