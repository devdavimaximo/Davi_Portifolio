/**
 * Single source of truth for every SEO surface: meta tags, Open Graph,
 * Twitter cards, JSON-LD, canonical URLs, sitemap and robots.
 *
 * Nothing here is a secret, so it is safe to inline in the built HTML.
 * The deployed origin comes from `VITE_SITE_URL` so previews and production
 * never emit each other's canonical URLs.
 */

const FALLBACK_ORIGIN = 'https://example.com';

/** Origin without a trailing slash, e.g. `https://davimaximo.dev`. */
export const siteUrl: string = (
  import.meta.env.VITE_SITE_URL ?? FALLBACK_ORIGIN
).replace(/\/$/, '');

export interface SiteAuthor {
  readonly name: string;
  readonly jobTitle: string;
  readonly email: string;
  readonly sameAs: readonly string[];
}

export interface SiteConfig {
  /** Brand name, used as the site name and as the `<title>` suffix. */
  readonly name: string;
  /** Default `<title>` of the home route. */
  readonly title: string;
  /** `%s | Brand` pattern applied to every other route. */
  readonly titleTemplate: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly locale: string;
  /** BCP 47 tag written to `<html lang>` and `og:locale`. */
  readonly htmlLang: string;
  readonly author: SiteAuthor;
  /** Path to the default social share image, relative to the site root. */
  readonly defaultOgImage: string;
  readonly twitterHandle: string;
  /** Brand color exposed through `<meta name="theme-color">`. */
  readonly themeColor: string;
}

// TODO(F0): replace the placeholder copy and links once the art direction and
// the public domain are settled.
export const siteConfig: SiteConfig = {
  name: 'Davi Maximo',
  title: 'Davi Maximo — Front-end Developer',
  titleTemplate: '%s — Davi Maximo',
  description:
    'Front-end developer crafting fast, accessible and memorable web experiences.',
  keywords: [
    'front-end developer',
    'creative developer',
    'react',
    'typescript',
    'web animation',
    'portfolio',
  ],
  locale: 'en',
  htmlLang: 'en',
  author: {
    name: 'Davi Maximo',
    jobTitle: 'Front-end Developer',
    email: 'davimaximoquooss@gmail.com',
    sameAs: [],
  },
  defaultOgImage: '/og/default.png',
  twitterHandle: '',
  themeColor: '#000000',
};

/** Turns a route path into an absolute canonical URL. */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
