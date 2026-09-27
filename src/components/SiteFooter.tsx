import { Link } from 'react-router-dom';

import { contactChannels } from '../content/contact-channels';
import { useTranslation } from '../lib/i18n';
import { siteConfig } from '../lib/seo';
import { SectionNav } from './SectionNav';
import styles from './SiteFooter.module.css';

/**
 * Where every page ends: who this is, the way back into each section, the
 * profiles, and the way back up.
 *
 * Deliberately quiet. The contact section right above it has just spent the
 * display face on the address the page is asking the reader to use; a second
 * outsized name here would compete with that call instead of closing under it.
 *
 * The section list is also the site navigation on narrow screens, where the
 * header keeps only the wordmark and its contact action.
 */
export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <Link className={styles.wordmark} to="/">
            {t.header.wordmark}
          </Link>
          <p className={styles.role}>{siteConfig.author.jobTitle}</p>
        </div>

        <SectionNav
          label={t.footer.sectionsLabel}
          className={styles.sections}
          listClassName={styles.column}
        />

        <ul
          className={`${styles.list} ${styles.column} ${styles.channels}`}
          aria-label={t.footer.channelsLabel}
        >
          {contactChannels.map((channel) => (
            <li key={channel.id}>
              <a className={styles.link} href={channel.href} translate="no">
                {channel.label}
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.base}>
          <p className={styles.copyright}>
            © {import.meta.env.VITE_BUILD_YEAR} {t.header.wordmark}
          </p>
          {/* The same target as the skip link: the top of the page's content,
              reachable without JavaScript. */}
          <a className={styles.link} href="#main">
            {t.footer.backToTop}
            <span className={styles.arrow} aria-hidden="true">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
