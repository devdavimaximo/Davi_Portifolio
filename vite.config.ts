import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import { createSitemapCollector } from './build/sitemap';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = env.VITE_SITE_URL ?? 'https://example.com';

  // Preview deployments must never compete with production in the index.
  const isProduction = mode === 'production';
  const sitemap = createSitemapCollector({
    siteUrl,
    blockIndexing: !isProduction,
  });

  return {
    plugins: [react()],

    server: {
      // Keep dev and preview below 49152: Windows lets Hyper-V/WSL reserve
      // blocks of the ephemeral range, and binding inside one fails with
      // EACCES on a port that is otherwise unused.
      port: 5173,
    },

    preview: {
      port: 4173,
    },

    build: {
      // Modern targets only: smaller output, no legacy transpilation cost.
      target: 'es2022',
      cssTarget: 'chrome111',
      sourcemap: false,
      // Surfaces bundle-budget regressions instead of silently growing.
      chunkSizeWarningLimit: 300,
      rollupOptions: {
        output: {
          // Keeps React in its own long-lived chunk so it stays cached across
          // deploys instead of being invalidated by every route change.
          manualChunks(id) {
            if (/node_modules[/\\](react|react-dom|react-router|scheduler)/.test(id)) {
              return 'react';
            }
            return undefined;
          },
        },
      },
    },

    ssgOptions: {
      // `/works` -> `/works/index.html`, so canonical URLs need no `.html`
      // suffix and no host-specific rewrite rules.
      dirStyle: 'nested',
      onPageRendered: sitemap.onPageRendered,
      onFinished: sitemap.onFinished,
    },
  };
});
