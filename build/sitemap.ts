import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export interface SitemapCollectorOptions {
  /** Deployed origin without a trailing slash. */
  readonly siteUrl: string;
  /** Routes kept out of the index and out of the sitemap. */
  readonly excludedRoutes?: readonly string[];
  /** Emit `Disallow: /` â€” used for preview deployments. */
  readonly blockIndexing?: boolean;
}

export interface SitemapCollector {
  onPageRendered: (route: string, renderedHTML: string) => string;
  onFinished: (outDir: string) => Promise<void>;
}

function toUrlEntry(siteUrl: string, route: string, lastmod: string): string {
  const path = route === '/' ? '' : route.replace(/\/$/, '');
  return [
    '  <url>',
    `    <loc>${siteUrl}${path}/</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>`,
    `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>`,
    '  </url>',
  ].join('\n');
}

/**
 * Derives `sitemap.xml` and `robots.txt` from the routes that were actually
 * pre-rendered, so the two can never drift from the route table.
 *
 * Wired into `ssgOptions` in `vite.config.ts`: `onPageRendered` records each
 * route as it is written, `onFinished` emits both files into the output dir.
 */
export function createSitemapCollector({
  siteUrl,
  excludedRoutes = [],
  blockIndexing = false,
}: SitemapCollectorOptions): SitemapCollector {
  const origin = siteUrl.replace(/\/$/, '');
  const excluded = new Set(excludedRoutes);
  const routes = new Set<string>();

  return {
    onPageRendered(route, renderedHTML) {
      if (!excluded.has(route) && !renderedHTML.includes('name="robots"')) {
        routes.add(route);
      }
      return renderedHTML;
    },

    async onFinished(outDir) {
      const lastmod = new Date().toISOString().slice(0, 10);
      const entries = [...routes]
        .sort()
        .map((route) => toUrlEntry(origin, route, lastmod))
        .join('\n');

      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        entries,
        '</urlset>',
        '',
      ].join('\n');

      const robots = blockIndexing
        ? ['User-agent: *', 'Disallow: /', ''].join('\n')
        : [
            'User-agent: *',
            'Allow: /',
            '',
            `Sitemap: ${origin}/sitemap.xml`,
            '',
          ].join('\n');

      await Promise.all([
        writeFile(join(outDir, 'sitemap.xml'), sitemap, 'utf8'),
        writeFile(join(outDir, 'robots.txt'), robots, 'utf8'),
      ]);

      console.log(
        `\n[vite-react-ssg] sitemap.xml (${routes.size} routes) and robots.txt written to ${outDir}`,
      );
    },
  };
}
