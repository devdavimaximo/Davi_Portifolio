import { useRef } from 'react';

import { useContactSignal } from '../../animations/use-contact-signal';
import { useSectionReveal } from '../../animations/use-section-reveal';
import { SectionHeading } from '../../components/SectionHeading';
import { contactChannels } from '../../content/contact-channels';
import { resume } from '../../content/resume';
import { useTranslation } from '../../lib/i18n';
import { siteConfig } from '../../lib/seo';
import { EmailCopy } from './EmailCopy';
import styles from './ContactSection.module.css';

/** Names the section for `aria-labelledby` and for the header's in-page link. */
const HEADING_ID = 'contact-heading';

/**
 * The close of the page: every way to reach the author, in the order the
 * author wants them used.
 *
 * No form, by decision — no third-party service, no key, no send script in the
 * bundle. The main channel is not a button and not a logo: it is the address
 * itself, set in the display face, playing the part the metric plays in the
 * works ledger. Everything else sits beneath it as a spec sheet — other
 * networks, the résumé with its weight declared, and the e-mail last.
 *
 * No network logos either. A row of brand marks is the most template-looking
 * thing a contact section can do, and the name of the network, written out,
 * says the same without an SVG in the bundle.
 */
export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useSectionReveal(sectionRef);
  useContactSignal(sectionRef);

  const [primary, ...elsewhere] = contactChannels;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={styles.contact}
      aria-labelledby={HEADING_ID}
    >
      <div className={styles.inner}>
        <SectionHeading
          index={t.contact.index}
          label={t.contact.label}
          lines={t.contact.headlineLines}
          headingId={HEADING_ID}
        />

        <a className={styles.primary} href={primary.href} data-reveal-trail="">
          {/* Brand names, like the handles: nothing for a translator to do. */}
          <span className={styles.network} translate="no">
            {primary.label}
          </span>
          <span className={styles.handle} translate="no">
            {primary.handle}
            <span className={styles.primaryArrow} aria-hidden="true">
              ↗
            </span>
          </span>
          {/* Where the hero's light converges in this section. Decoration only:
              the link's name is the network and the handle above it. */}
          <span
            className={styles.signal}
            data-contact-signal=""
            aria-hidden="true"
          />
        </a>

        {/* A description list, because that is what this is: a label and the
            way in it names. The `div` wrappers are valid inside a `dl` and give
            each pair one box to lay out and to reveal. */}
        <dl className={styles.details}>
          {elsewhere.length > 0 && (
            <div className={styles.detail} data-reveal-trail="">
              <dt className={styles.detailLabel}>{t.contact.elsewhere}</dt>
              <dd className={styles.detailValue}>
                <ul className={styles.channels}>
                  {elsewhere.map((channel) => (
                    <li key={channel.id}>
                      <a className={styles.detailLink} href={channel.href}>
                        <span className={styles.detailName} translate="no">
                          {channel.label}
                        </span>
                        <span className={styles.detailMeta} translate="no">
                          {channel.handle}
                        </span>
                        <span className={styles.detailArrow} aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}

          {resume && (
            <div className={styles.detail} data-reveal-trail="">
              <dt className={styles.detailLabel}>{t.contact.resume.label}</dt>
              <dd className={styles.detailValue}>
                <a
                  className={styles.detailLink}
                  href={resume.href}
                  download={resume.fileName}
                  type="application/pdf"
                >
                  <span className={styles.detailName}>
                    {t.contact.resume.download}
                  </span>
                  <span className={styles.detailMeta}>
                    {resume.format} · {resume.size}
                  </span>
                  <span className={styles.detailArrow} aria-hidden="true">
                    ↓
                  </span>
                </a>
              </dd>
            </div>
          )}

          <div className={styles.detail} data-reveal-trail="">
            <dt className={styles.detailLabel}>{t.contact.email.label}</dt>
            <dd className={styles.detailValue}>
              <EmailCopy email={siteConfig.author.email} />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
