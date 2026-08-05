import { Head } from 'vite-react-ssg';

import type { JsonLdNode } from './json-ld';
import { absoluteUrl, canonicalUrl, siteConfig } from './site-config';

export interface SeoProps {
  /** Route title without the brand suffix. Omit on the home route. */
  readonly title?: string;
  readonly description?: string;
  /** Route path used for the canonical URL and `og:url`, e.g. `/works`. */
  readonly path: string;
  /** Share image path relative to the site root. */
  readonly image?: string;
  readonly type?: 'website' | 'article' | 'profile';
  /** Structured data emitted as `application/ld+json`. */
  readonly jsonLd?: readonly JsonLdNode[];
  /** Keeps a route out of the index (thank-you pages, drafts). */
  readonly noIndex?: boolean;
}

/**
 * Per-route `<head>`: title, description, canonical, Open Graph, Twitter card
 * and JSON-LD. Rendered into the static HTML at build time, so crawlers get the
 * full metadata without executing any JavaScript.
 */
export function Seo({
  title,
  description = siteConfig.description,
  path,
  image = siteConfig.defaultOgImage,
  type = 'website',
  jsonLd,
  noIndex = false,
}: SeoProps) {
  const resolvedTitle = title
    ? siteConfig.titleTemplate.replace('%s', title)
    : siteConfig.title;
  const canonical = canonicalUrl(path);
  const imageUrl = absoluteUrl(image);

  return (
    <Head>
      <html lang={siteConfig.htmlLang} />
      {/* Declared here as well as in `index.html`: the pre-renderer injects this
          block at the top of <head>, which pushed the template's own charset
          past ~2.9 KB — far outside the first 1024 bytes a parser is required to
          decide the encoding in. On a page of pt-BR accents that is not
          cosmetic. Browsers honour the first declaration, so this one wins. */}
      <meta charSet="UTF-8" />
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={siteConfig.keywords.join(', ')} />
      <meta name="author" content={siteConfig.author.name} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={siteConfig.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {siteConfig.twitterHandle && (
        <meta name="twitter:creator" content={siteConfig.twitterHandle} />
      )}

      {jsonLd?.map((node) => (
        <script
          key={String(node['@id'] ?? node['@type'])}
          type="application/ld+json"
        >
          {JSON.stringify(node)}
        </script>
      ))}
    </Head>
  );
}
