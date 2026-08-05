import type { Project } from '../../content/types';
import { useTranslation } from '../../lib/i18n';
import styles from './CaseDetails.module.css';

interface CaseDetailsProps {
  readonly project: Project;
}

/**
 * The argument a case is made of: its metadata and the three beats.
 *
 * Shared by the disclosure panel on the index and by the case's own page, so
 * the two can never tell the same story with different words. Both `<dl>`s are
 * returned as siblings rather than wrapped, so whichever container renders them
 * decides their layout — the panel puts them in two columns, the page stacks.
 */
export function CaseDetails({ project }: CaseDetailsProps) {
  const { beats, meta } = useTranslation().t.works;

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
    <>
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
    </>
  );
}
