/**
 * Single source of truth for every SEO surface: meta tags, Open Graph,
 * Twitter cards, JSON-LD, canonical URLs, sitemap and robots.
 *
 * Nothing here is a secret, so it is safe to inline in the built HTML.
 * The deployed origin comes from `VITE_SITE_URL` so previews and production
 * never emit each other's canonical URLs.
 */

import { defaultLocale } from '../i18n';

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
  /** Open Graph locale, underscore-separated (`pt_BR`). */
  readonly locale: string;
  /** BCP 47 tag written to `<html lang>` and to `inLanguage` in JSON-LD. */
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
  title: 'Davi Maximo — Desenvolvedor Front-end',
  titleTemplate: '%s — Davi Maximo',
  description:
    'Desenvolvedor front-end criando experiências web rápidas, acessíveis e memoráveis.',
  keywords: [
    'desenvolvedor front-end',
    'desenvolvedor criativo',
    'react',
    'typescript',
    'animação web',
    'portfólio',
  ],
  // Derived from the i18n base locale so the two can never disagree.
  locale: defaultLocale.replace('-', '_'),
  htmlLang: defaultLocale,
  author: {
    name: 'Davi Maximo',
    jobTitle: 'Desenvolvedor Front-end',
    email: 'davimaximoquooss@gmail.com',
    sameAs: [],
  },
  defaultOgImage: '/og/default.png',
  twitterHandle: '',
  themeColor: '#000000',
};

/** Turns any site-relative path into an absolute URL. */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * The one spelling of a page's address: absolute, with a trailing slash.
 *
 * `dirStyle: 'nested'` writes every route as `<route>/index.html`, and the
 * sitemap lists it that way, so a canonical without the slash would point at a
 * second URL for the same file and split its signals. Paths carrying a fragment
 * or a query are left as they are — a slash there would change what they mean.
 */
export function canonicalUrl(path = '/'): string {
  const url = absoluteUrl(path);
  if (/[#?]/.test(url) || url.endsWith('/')) return url;
  return `${url}/`;
}
