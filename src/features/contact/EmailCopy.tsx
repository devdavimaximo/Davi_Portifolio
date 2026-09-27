import { useCopyToClipboard } from '../../hooks/use-copy-to-clipboard';
import { useTranslation } from '../../lib/i18n';
import styles from './ContactSection.module.css';

interface EmailCopyProps {
  readonly email: string;
}

/**
 * The e-mail address as a link, with a control that copies it.
 *
 * Copying is the micro-interaction and the link is the floor under it: a
 * visitor whose browser refuses the clipboard, or who simply prefers their mail
 * client, still has a working way to the address one tap away.
 *
 * The outcome is said twice, to two audiences. Sighted visitors read it off the
 * button, which swaps its label; screen readers hear it from a polite live
 * region, because a label that changes under focus is not reliably announced.
 */
export function EmailCopy({ email }: EmailCopyProps) {
  const { t } = useTranslation();
  const { status, copy } = useCopyToClipboard();

  const buttonLabel = {
    idle: t.contact.email.copy,
    copied: t.contact.email.copied,
    failed: t.contact.email.failed,
  }[status];

  const announcement = {
    idle: '',
    copied: t.contact.email.copiedAnnouncement,
    failed: t.contact.email.failedAnnouncement,
  }[status];

  return (
    <div className={styles.email}>
      {/* An address, not prose: auto-translation has no business in it. */}
      <a className={styles.emailLink} href={`mailto:${email}`} translate="no">
        {email}
      </a>

      <button
        type="button"
        className={styles.copy}
        data-status={status}
        onClick={() => void copy(email)}
      >
        {buttonLabel}
        {/* "Copiar" alone is ambiguous when a screen reader lists the page's
            buttons out of context; the hidden object completes it without
            changing what is drawn. */}
        {status === 'idle' && (
          <span className="visually-hidden"> {t.contact.email.label}</span>
        )}
      </button>

      {/* `<output>` is the native status element: a polite live region with no
          role or aria-live to add by hand. */}
      <output className="visually-hidden">{announcement}</output>
    </div>
  );
}
