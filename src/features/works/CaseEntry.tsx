import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { Project } from '../../content/types';
import { useTranslation } from '../../lib/i18n';
import { CaseDetails } from './CaseDetails';
import { caseRoutePath } from './case-route';
import styles from './WorksSection.module.css';

interface CaseEntryProps {
  readonly project: Project;
  /** Position in the list, already formatted for display ("01", "02"…). */
  readonly index: string;
}

/**
 * One case, as a ledger row that opens.
 *
 * Collapsed, it is scannable in a glance: number, title, one line, the figure.
 * Expanded, it makes the full argument. Putting every case's beats on the page
 * at once turned the section into stacked paragraphs of identical rhythm — the
 * reader now chooses which arguments to read.
 *
 * Built as a heading-wrapped button rather than `<details>`, because `<summary>`
 * may hold phrasing content *or* a single heading, not a row of both. The panel
 * stays in the DOM when closed and is hidden with the `hidden` attribute, so the
 * pre-rendered HTML still carries every word for crawlers.
 */
export function CaseEntry({ project, index }: CaseEntryProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  /* Derived from the slug rather than generated: the slug is already unique and
     stable, and a readable id doubles as a deep link to a single case. */
  const headingId = `case-${project.slug}`;
  const panelId = `${headingId}-panel`;

  return (
    <article
      className={styles.case}
      aria-labelledby={headingId}
      data-works-entry=""
    >
      <h3 id={headingId} className={styles.caseHeading}>
        <button
          type="button"
          className={styles.caseTrigger}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className={styles.caseIndex}>{index}</span>

          <span className={styles.caseNaming}>
            <span className={styles.caseTitle}>{project.title}</span>
            <span className={styles.caseSummary}>{project.summary}</span>
          </span>

          {project.metric && (
            <span className={styles.metric}>
              <span className={styles.metricValue}>{project.metric.value}</span>
              <span className={styles.metricLabel}>{project.metric.label}</span>
            </span>
          )}

          <span className={styles.caseAction}>
            <span className={styles.marker} aria-hidden="true" />
            <span className={styles.triggerLabel}>
              {isOpen ? t.works.collapse : t.works.expand}
            </span>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        className={styles.panel}
        hidden={!isOpen}
        data-open={isOpen ? '' : undefined}
      >
        <CaseDetails project={project} />

        {/* Named after the case it leads to: three rows repeating the same link
            text are indistinguishable in a screen reader's list of links. */}
        <Link
          className={styles.panelLink}
          to={caseRoutePath(project.slug)}
          aria-label={`${t.works.viewCase}: ${project.title}`}
        >
          {t.works.viewCase}
          <span className={styles.panelLinkArrow} aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
