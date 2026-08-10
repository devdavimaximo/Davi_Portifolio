import { useRef } from 'react';

import { useAboutReveal } from '../../animations/use-about-reveal';
import { usePortraitLight } from '../../animations/use-portrait-light';
import { SectionHeading } from '../../components/SectionHeading';
import { useTranslation } from '../../lib/i18n';
import { AboutPortrait } from './AboutPortrait';
import styles from './AboutSection.module.css';

/** Names the section for `aria-labelledby` and for in-page links later on. */
const HEADING_ID = 'about-heading';

/**
 * Editorial spread introducing the person behind the work: a numbered section
 * rule, a two-line statement in the hero's own masked-reveal language, the
 * detail underneath it, and the portrait holding the right column.
 */
export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useAboutReveal(sectionRef);
  usePortraitLight(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={styles.about}
      aria-labelledby={HEADING_ID}
    >
      <div className={styles.inner}>
        <SectionHeading
          index={t.about.index}
          label={t.about.label}
          lines={t.about.headlineLines}
          headingId={HEADING_ID}
          labelClassName={styles.labelArea}
          headlineClassName={styles.headlineArea}
        />

        <AboutPortrait alt={t.about.portraitAlt} />

        <div className={styles.body}>
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph} data-reveal-fade="">
              {paragraph}
            </p>
          ))}

          <ul className={styles.principles}>
            {t.about.principles.map((principle) => (
              <li
                key={principle}
                className={styles.principle}
                data-reveal-fade=""
              >
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
