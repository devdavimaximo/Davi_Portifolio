import { useRef } from 'react';

import { useWorksReveal } from '../../animations/use-works-reveal';
import { getPublishedProjects } from '../../content/projects';
import { useTranslation } from '../../lib/i18n';
import { CaseEntry } from './CaseEntry';
import styles from './WorksSection.module.css';

/** Names the section for `aria-labelledby` and for in-page links later on. */
const HEADING_ID = 'works-heading';

/** Two digits, so the rail keeps its column width from the first case on. */
const formatIndex = (position: number): string =>
  String(position + 1).padStart(2, '0');

/**
 * The showcase. These systems are internal or client-owned, so there is no
 * screen to show — each case is argued instead of illustrated, in the same
 * numbered, rule-separated language the about section established.
 *
 * Renders nothing at all when there is no published case: an empty section
 * heading over blank space reads as a broken page.
 */
export function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const projects = getPublishedProjects();

  useWorksReveal(sectionRef);

  if (projects.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="works"
      className={styles.works}
      aria-labelledby={HEADING_ID}
    >
      <div className={styles.inner}>
        <p className={styles.label} data-works-fade="">
          <span className={styles.index}>{t.works.index}</span>
          {t.works.label}
        </p>

        <h2 id={HEADING_ID} className={styles.headline}>
          {t.works.headlineLines.map((line) => (
            <span key={line} className={styles.lineMask}>
              <span className={styles.line} data-works-line="">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div className={styles.cases}>
          {projects.map((project, position) => (
            <CaseEntry
              key={project.slug}
              project={project}
              index={formatIndex(position)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
