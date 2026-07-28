import { HeroSection } from '../../features/hero';
import { createPersonSchema, createWebSiteSchema, Seo } from '../../lib/seo';

/** Home route: metadata plus the entry experience. */
export default function HomePage() {
  return (
    <>
      <Seo
        path="/"
        jsonLd={[createPersonSchema(), createWebSiteSchema()]}
      />
      <HeroSection />
    </>
  );
}
