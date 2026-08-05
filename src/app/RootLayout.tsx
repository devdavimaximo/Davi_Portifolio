import { Outlet } from 'react-router-dom';

import { SiteHeader } from '../components/SiteHeader';
import { useRouteScroll } from '../hooks/use-route-scroll';
import { useTranslation } from '../lib/i18n';

/**
 * Shell shared by every route: skip link, fixed header and the single
 * `<main>` landmark. Chrome that persists across routes (nav, footer, smooth
 * scroll, page transitions) belongs here.
 */
export function RootLayout() {
  const { t } = useTranslation();

  useRouteScroll();

  return (
    <>
      <a className="skip-link" href="#main">
        {t.a11y.skipToContent}
      </a>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
    </>
  );
}
