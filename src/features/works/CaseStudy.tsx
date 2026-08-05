import { Link } from 'react-router-dom';

import type { Project } from '../../content/types';
import { useTranslation } from '../../lib/i18n';
import type { BreadcrumbItem } from '../../lib/seo';
import { CaseDetails } from './CaseDetails';
import styles from './CaseStudy.module.css';

interface CaseStudyProps {
  readonly project: Project;
  /**
   * The same trail the page publishes as `BreadcrumbList`. Passed in rather
   * than rebuilt here so the structured data and the visible navigation are
   * one list, not two that happen to agree today.
   */
  readonly breadcrumb: readonly BreadcrumbItem[];
}

/**
 * A case on its own page: the whole argument, open, with no control to operate.
 *
 * The index reads as a ledger because each row has to compete with the next
 * one; here nothing competes, so the page can spend its width on the figure and
 * let the beats run at full measure.
 */
export function CaseStudy({ project, breadcrumb }: CaseStudyProps) {
  const { t } = useTranslation();
  const { caseStudy } = t;

  /* The current page is the last crumb: it is announced, but it is not a link
     to where the reader already is. */
  const trail = breadcrumb.slice(0, -1);

  return (
    <article className={styles.page}>
      <div className={styles.inner}>
        <nav className={styles.breadcrumb} aria-label={caseStudy.breadcrumbLabel}>
          <ol className={styles.trail}>
            {trail.map((crumb) => (
              <li key={crumb.path} className={styles.crumb}>
                <Link to={crumb.path}>{crumb.name}</Link>
              </li>
            ))}
            <li className={styles.crumb} aria-current="page">
              {project.title}
            </li>
          </ol>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>

          {project.metric && (
            <p className={styles.metric}>
              <span className={styles.metricValue}>{project.metric.value}</span>
              <span className={styles.metricLabel}>{project.metric.label}</span>
            </p>
          )}
        </header>

        <div className={styles.body}>
          <CaseDetails project={project} />
        </div>

        <Link className={styles.back} to={trail.at(-1)?.path ?? '/'}>
          <span className={styles.backArrow} aria-hidden="true">
            ←
          </span>
          {caseStudy.back}
        </Link>
      </div>
    </article>
  );
}
