import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Puts a client-side navigation where the reader expects it.
 *
 * React Router changes the route without touching the scroll position, so
 * following a link from halfway down the index dropped the reader halfway down
 * the case that opened. A browser reset would have done this on a real page
 * load; the router has to do it here.
 *
 * Three cases, each matching what the browser itself would do:
 * back/forward is left alone so the browser's own restoration still works, a
 * hash goes to the element it names, and anything else goes to the top.
 *
 * Deliberately instant: this is a page change, not a movement to follow, and
 * smooth-scrolling it would be motion the visitor never asked for.
 */
export function useRouteScroll(): void {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === 'POP') return;

    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'auto' });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash, navigationType]);
}
