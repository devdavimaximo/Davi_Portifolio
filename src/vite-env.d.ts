/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Deployed origin, e.g. `https://davimaximo.dev`. Drives canonical URLs, OG tags and the sitemap. */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
