import { useRef } from 'react';

import { useAboutReveal } from '../../animations/use-about-reveal';
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className={styles.about}
      aria-labelledby={HEADING_ID}
    >
      <div className={styles.inner}>
        <p className={styles.label} data-about-fade="">
          <span className={styles.index}>{t.about.index}</span>
          {t.about.label}
        </p>

        <h2 id={HEADING_ID} className={styles.headline}>
          {t.about.headlineLines.map((line) => (
            <span key={line} className={styles.lineMask}>
              <span className={styles.line} data-about-line="">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <AboutPortrait alt={t.about.portraitAlt} />

        <div className={styles.body}>
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph} data-about-fade="">
              {paragraph}
            </p>
          ))}

          <ul className={styles.principles}>
            {t.about.principles.map((principle) => (
              <li
                key={principle}
                className={styles.principle}
                data-about-fade=""
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
