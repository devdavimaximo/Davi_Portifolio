import { Link } from 'react-router-dom';

import { useTranslation } from '../lib/i18n';
import { siteConfig } from '../lib/seo';
import styles from './SiteHeader.module.css';

/**
 * Fixed glass header: wordmark and the contact action. Grows into the full
 * site navigation once there is more than one route to point at.
 */
export function SiteHeader() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.wordmark} to="/">
          {t.header.wordmark}
        </Link>
        <a
          className={styles.contact}
          href={`mailto:${siteConfig.author.email}`}
        >
          {t.header.contact}
        </a>
      </div>
    </header>
  );
}
