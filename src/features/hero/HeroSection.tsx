import { useRef } from 'react';

import { useHeroIntro } from '../../animations/use-hero-intro';
import { useTranslation } from '../../lib/i18n';
import { HeroBackground } from './HeroBackground';
import styles from './HeroSection.module.css';

/**
 * Entry experience: full-viewport 3D backdrop, oversized masked headline and
 * a single primary action. Owns the page's `<h1>`, so the visitor's name and
 * role are in the document outline even before any JavaScript runs.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useHeroIntro(sectionRef);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <HeroBackground />

      <div className={styles.content} data-hero-content="">
        <div>
          <h1 className={styles.headline}>
            <span className={styles.eyebrow} data-hero-fade="">
              {t.hero.eyebrow}
            </span>
            {t.hero.headlineLines.map((line) => (
              <span key={line} className={styles.lineMask}>
                <span className={styles.line} data-hero-line="">
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className={styles.stack} data-hero-fade="">
            {t.hero.stack}
          </p>
        </div>

        <div className={styles.aside}>
          <p className={styles.description} data-hero-fade="">
            {t.hero.description}
          </p>
          <a
            className={styles.cta}
            /* Goes where the label promises. This opened the mail client while
               reading "Ver projetos" — the one action in the first fold sent
               everyone who trusted it to the wrong place. Contact is its own
               section now, and the header holds that invitation. */
            href="#works"
            data-hero-fade=""
          >
            {t.hero.contactCta}
            <svg
              className={styles.ctaIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
