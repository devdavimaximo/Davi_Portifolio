/**
 * Single source of truth for every SEO surface: meta tags, Open Graph,
 * Twitter cards, JSON-LD, canonical URLs, sitemap and robots.
 *
 * Nothing here is a secret, so it is safe to inline in the built HTML.
 * The deployed origin comes from `VITE_SITE_URL` so previews and production
 * never emit each other's canonical URLs.
 */

import { contactChannels } from '../../content/contact-channels';
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

// The identity below is the one the hero, the about section and the cases
// argue for: full stack, weighted towards the .NET back end. The `Person`
// JSON-LD is what a search engine reads, so it must not describe someone the
// page itself does not.
//
// TODO(F0): Twitter handle and the default share image are still missing.
export const siteConfig: SiteConfig = {
  name: 'Davi Maximo',
  title: 'Davi Maximo — Desenvolvedor Full Stack C# / .NET',
  titleTemplate: '%s — Davi Maximo',
  description:
    'Desenvolvedor full stack com foco em back-end C# / .NET. Sistemas em produção, do banco de dados à interface, com arquitetura, performance e escalabilidade.',
  keywords: [
    'desenvolvedor full stack',
    'desenvolvedor .NET',
    'C#',
    'ASP.NET Core',
    'back-end',
    'react',
    'typescript',
    'portfólio',
  ],
  // Derived from the i18n base locale so the two can never disagree.
  locale: defaultLocale.replace('-', '_'),
  htmlLang: defaultLocale,
  author: {
    name: 'Davi Maximo',
    jobTitle: 'Desenvolvedor Full Stack C# / .NET',
    email: 'devdavimaximo@gmail.com',
    // Read from the same list the contact section and the footer render, so
    // the profiles a crawler links to are always the ones a visitor sees.
    sameAs: contactChannels.map((channel) => channel.href),
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
