// Simplified permalink helper.
// AstroWind's original version reads these from config.yaml through a custom
// virtual module + vendor integration. For this site we just hardcode the two
// values that matter (they mirror src/config.yaml) so there's one obvious
// place to look, no build-time magic required.
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

/** Builds a site-relative permalink, respecting the configured base path. */
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

/** Convenience helper for the homepage link. */
export const getHomePermalink = (): string => getPermalink('/');
