const BASE_PATHNAME = '/';
const TRAILING_SLASH = false;

const trimSlash = (s: string) => s.replace(/^\/+|\/+$/g, '');

const createPath = (...params: string[]): string => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
  return '/' + paths + (TRAILING_SLASH && paths ? '/' : '');
};

export const getPermalink = (slug = ''): string => {
  if (
    slug.startsWith('https://') ||
    slug.startsWith('http://') ||
    slug.startsWith('://') ||
    slug.startsWith('#') ||
    slug.startsWith('mailto:') ||
    slug.startsWith('javascript:')
  ) {
    return slug;
  }

  return createPath(BASE_PATHNAME, slug);
};

export const getHomePermalink = (): string => getPermalink('/');
