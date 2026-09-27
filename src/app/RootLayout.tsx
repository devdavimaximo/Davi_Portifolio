import { Outlet } from 'react-router-dom';

import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { useRouteScroll } from '../hooks/use-route-scroll';
import { useTranslation } from '../lib/i18n';

/**
 * Shell shared by every route: skip link, fixed header, the single `<main>`
 * landmark and the footer. Chrome that persists across routes (smooth scroll,
 * page transitions) belongs here.
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
      <SiteFooter />
    </>
  );
}
