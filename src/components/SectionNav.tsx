import { Link } from 'react-router-dom';

import { useTranslation } from '../lib/i18n';
import { sectionHref, siteSections } from './site-sections';
import styles from './SectionNav.module.css';

interface SectionNavProps {
  /** Accessible name — the header and the footer each carry one of these. */
  readonly label: string;
  /**
   * Placement from the owner: where the landmark sits, and how its list runs.
   * Explicitly `| undefined` for the same reason as `SectionHeading`: a
   * CSS-module lookup is `string | undefined` under `noUncheckedIndexedAccess`.
   */
  readonly className?: string | undefined;
  readonly listClassName?: string | undefined;
}

/**
 * The home's sections as a numbered table of contents, in the voice of each
 * section's own label ("01 Sobre"). One component for the header and the
 * footer, so the two can never list different sections or name them apart.
 */
export function SectionNav({ label, className, listClassName }: SectionNavProps) {
  const { t } = useTranslation();

  return (
    <nav className={className} aria-label={label}>
      <ol className={[styles.list, listClassName].filter(Boolean).join(' ')}>
        {siteSections.map((id) => (
          <li key={id}>
            <Link className={styles.link} to={sectionHref(id)}>
              <span className={styles.index}>{t[id].index}</span>
              {t[id].label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
