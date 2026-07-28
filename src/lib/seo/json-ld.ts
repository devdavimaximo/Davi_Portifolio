/**
 * Structured data builders (schema.org / JSON-LD).
 *
 * Kept as plain data factories so they can be unit-tested and reused by the
 * sitemap tooling without pulling React in.
 */

import { absoluteUrl, siteConfig } from './site-config';

/** Minimal structural type for a JSON-LD node — enough to stay type-safe without a schema library. */
export interface JsonLdNode {
  readonly '@context'?: string;
  readonly '@type': string;
  readonly [key: string]: unknown;
}

export function createPersonSchema(): JsonLdNode {
  const { author, description } = siteConfig;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${absoluteUrl('/')}#person`,
    name: author.name,
    jobTitle: author.jobTitle,
    email: `mailto:${author.email}`,
    url: absoluteUrl('/'),
    description,
    ...(author.sameAs.length > 0 && { sameAs: [...author.sameAs] }),
  };
}

export function createWebSiteSchema(): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/')}#website`,
    name: siteConfig.name,
    url: absoluteUrl('/'),
    description: siteConfig.description,
    inLanguage: siteConfig.htmlLang,
    author: { '@id': `${absoluteUrl('/')}#person` },
  };
}

export interface CreativeWorkInput {
  readonly name: string;
  readonly description: string;
  readonly path: string;
  readonly image?: string;
  readonly keywords?: readonly string[];
  readonly datePublished?: string;
}

export function createCreativeWorkSchema(work: CreativeWorkInput): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${absoluteUrl(work.path)}#creativework`,
    name: work.name,
    description: work.description,
    url: absoluteUrl(work.path),
    inLanguage: siteConfig.htmlLang,
    creator: { '@id': `${absoluteUrl('/')}#person` },
    ...(work.image && { image: absoluteUrl(work.image) }),
    ...(work.keywords && { keywords: [...work.keywords] }),
    ...(work.datePublished && { datePublished: work.datePublished }),
  };
}

export interface BreadcrumbItem {
  readonly name: string;
  readonly path: string;
}

export function createBreadcrumbSchema(
  items: readonly BreadcrumbItem[],
): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
