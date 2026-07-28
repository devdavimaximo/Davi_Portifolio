import { useTranslation } from '../../lib/i18n';
import { createPersonSchema, createWebSiteSchema, Seo } from '../../lib/seo';

/**
 * Home route.
 *
 * Structural placeholder: it exists so the route pre-renders with real metadata
 * and a valid heading outline. The hero itself lands in F2.
 */
export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        path="/"
        jsonLd={[createPersonSchema(), createWebSiteSchema()]}
      />
      <h1>{t.home.heading}</h1>
    </>
  );
}
