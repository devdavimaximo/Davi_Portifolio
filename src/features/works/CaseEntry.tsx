import { useId, useState } from 'react';

import type { Project } from '../../content/types';
import { useTranslation } from '../../lib/i18n';
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
  const panelId = useId();
  const { beats, meta } = t.works;

  const metaRows = [
    { label: meta.role, value: project.role },
    ...(project.client ? [{ label: meta.client, value: project.client }] : []),
    { label: meta.stack, value: project.stack.join(' · ') },
  ];

  const beatRows = [
    { label: beats.problem, value: project.narrative.problem },
    { label: beats.decision, value: project.narrative.decision },
    { label: beats.outcome, value: project.narrative.outcome },
  ];

  return (
    <article className={styles.case} data-works-entry="">
      <h3 className={styles.caseHeading}>
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
        <dl className={styles.meta}>
          {metaRows.map((row) => (
            <div key={row.label} className={styles.metaRow}>
              <dt className={styles.metaLabel}>{row.label}</dt>
              <dd className={styles.metaValue}>{row.value}</dd>
            </div>
          ))}
        </dl>

        <dl className={styles.beats}>
          {beatRows.map((row) => (
            <div key={row.label} className={styles.beat}>
              <dt className={styles.beatLabel}>{row.label}</dt>
              <dd className={styles.beatValue}>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
