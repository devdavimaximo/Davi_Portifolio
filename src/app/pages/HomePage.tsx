import { AboutSection } from '../../features/about';
import { ContactSection } from '../../features/contact';
import { HeroSection } from '../../features/hero';
import { SkillsSection } from '../../features/skills';
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
      <SkillsSection />
      <ContactSection />
    </>
  );
}
