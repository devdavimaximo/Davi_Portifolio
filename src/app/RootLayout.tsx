import { Outlet } from 'react-router-dom';

import { useTranslation } from '../lib/i18n';

/**
 * Shell shared by every route: skip link and the single `<main>` landmark.
 * Chrome that persists across routes (nav, footer, smooth scroll, page
 * transitions) belongs here.
 */
export function RootLayout() {
  const { t } = useTranslation();

  return (
    <>
      <a className="skip-link" href="#main">
        {t.a11y.skipToContent}
      </a>
      <main id="main">
        <Outlet />
      </main>
    </>
  );
}
