import { Link } from 'react-router-dom';

import { useTranslation } from '../lib/i18n';
import { SectionNav } from './SectionNav';
import { sectionHref } from './site-sections';
import styles from './SiteHeader.module.css';

/**
 * Fixed glass header: wordmark, the section navigation and the contact action.
 *
 * The action leads to the contact section rather than opening a mail client:
 * the section is where the channels are laid out in the order they should be
 * used, and a `mailto:` here skipped straight past it to the secondary one.
 *
 * The section links appear from the wide breakpoint only. Below it the header
 * keeps the wordmark and the action, and the footer carries the sections — a
 * menu overlay for narrow screens is a motion piece, and belongs to F5.
 *
 * TODO(F5): overlay menu on narrow screens; marker for the section in view.
 */
export function SiteHeader() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.wordmark} to="/">
          {t.header.wordmark}
        </Link>
        <SectionNav label={t.header.navLabel} className={styles.nav} />
        <Link className={styles.contact} to={sectionHref('contact')}>
          {t.header.contact}
        </Link>
      </div>
    </header>
  );
}
