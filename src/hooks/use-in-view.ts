import { type RefObject, useEffect, useState } from 'react';

/**
 * Whether the element is intersecting the viewport.
 *
 * Starts as `true` so content at the top of the page (the hero) is live on the
 * very first client render; the observer corrects the value right away for
 * anything mounted off-screen. Used to pause render loops and heavy effects
 * the moment their element scrolls out.
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = '0px',
): boolean {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setInView(entry.isIntersecting);
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
