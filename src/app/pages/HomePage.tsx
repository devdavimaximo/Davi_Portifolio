import { AboutSection } from '../../features/about';
import { HeroSection } from '../../features/hero';
import { WorksSection } from '../../features/works';
import { createPersonSchema, createWebSiteSchema, Seo } from '../../lib/seo';

/** Home route: metadata, the entry experience and the sections below it. */
export default function HomePage() {
  return (
    <>
      <Seo
        path="/"
        jsonLd={[createPersonSchema(), createWebSiteSchema()]}
      />
      <HeroSection />
      <AboutSection />
      <WorksSection />
    </>
  );
}
