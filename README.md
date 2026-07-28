# Portfolio

Personal front-end portfolio. Built as a showcase piece: distinctive art direction and
motion, held to the same performance and accessibility bar as the visuals.

Static, pre-rendered, no backend.

## Stack

| Concern | Choice |
| --- | --- |
| UI | React 19 + TypeScript (`strict`) |
| Build | Vite |
| Rendering | `vite-react-ssg` — static HTML per route, hydrated on the client |
| Styling | CSS custom properties (design tokens), no UI framework |
| Linting | oxlint |
| Deploy | Static CDN |

Every route ships real HTML in the initial response, so crawlers and the first paint never
wait on JavaScript. React hydrates on top and the app is fully dynamic from there.

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_SITE_URL
npm run dev
```

## Scripts

```bash
npm run dev         # dev server
npm run build       # typecheck + static pre-rendered build into dist/
npm run preview     # serve the production build locally
npm run lint        # oxlint
npm run typecheck   # tsc project references
```

Audit a production build:

```bash
npm run build && npm run preview
npx lighthouse http://localhost:4173 --view
```

## Structure

```
build/          build-time tooling (sitemap + robots generation)
public/         static assets, fonts, social images
src/
  app/          routes, root layout, pages
  features/     self-contained page sections
  components/   reusable presentational UI
  animations/   GSAP timelines and motion tokens
  three/        r3f scenes, materials, 3D hooks
  hooks/        reusable logic
  lib/
    seo/        site config, <Seo />, JSON-LD builders
    i18n/       locales and dictionaries
  styles/       design tokens and base styles
  content/      project data behind the showcase
```

Dependencies point inward: pages consume features, features consume components and hooks.
Animation and 3D live in their own modules and are exposed as hooks — never implemented
inline in JSX.

## SEO

Handled at build time, per route:

- `<Seo />` emits title, description, canonical, Open Graph, Twitter card and JSON-LD into
  the static HTML.
- `sitemap.xml` and `robots.txt` are generated from the routes that were actually
  pre-rendered, so they cannot drift from the route table.
- Non-production builds emit `Disallow: /` so preview deployments stay out of the index.

Set `VITE_SITE_URL` per environment — it drives every absolute URL.

## Targets

- Lighthouse ≥ 95 across all four categories, mobile and desktop
- LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1
- 60fps on every animation
- WCAG AA contrast, full keyboard operation, `prefers-reduced-motion` respected everywhere
