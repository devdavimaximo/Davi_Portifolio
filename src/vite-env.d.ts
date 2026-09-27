/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Deployed origin, e.g. `https://davimaximo.dev`. Drives canonical URLs, OG tags and the sitemap. */
  readonly VITE_SITE_URL?: string;
  /** Year of the build, injected by `vite.config.ts` — never set by hand. */
  readonly VITE_BUILD_YEAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
