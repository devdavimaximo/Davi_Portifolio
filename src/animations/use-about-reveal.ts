import type { RefObject } from 'react';

import { gsap, useGSAP } from './gsap';
import {
  duration,
  easing,
  reducedMotionDurationScale,
} from './motion-tokens';
import { useSectionReveal } from './use-section-reveal';

/** The portrait, which drifts against the copy while the section passes. */
const PORTRAIT = '[data-about-portrait]';

/** Fraction of its own height the portrait travels across the whole section. */
const PARALLAX_REACH = 4;

/**
 * The about section's entrance: the shared section choreography, plus the one
 * thing only this section has.
 *
 * The portrait joins on the same trigger as the statement, so the two still
 * arrive together, and then keeps a slow, scrubbed drift that only ever writes
 * `transform` — reading as depth rather than as an effect: the figure shifts
 * inside its plate while the plate itself stays put.
 *
 * Visitors who prefer reduced motion get the figure as a plain fade, with no
 * drift at all.
 */
export function useAboutReveal(scope: RefObject<HTMLElement | null>): void {
  useSectionReveal(scope);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(PORTRAIT, {
          autoAlpha: 0,
          scale: 1.06,
          duration: duration.slower,
          ease: easing.expressive,
          scrollTrigger: { trigger: root, start: 'top 70%' },
        });

        gsap.fromTo(
          PORTRAIT,
          { yPercent: -PARALLAX_REACH },
          {
            yPercent: PARALLAX_REACH,
            ease: easing.linear,
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from(PORTRAIT, {
          autoAlpha: 0,
          duration: duration.base * reducedMotionDurationScale,
          ease: easing.standard,
          scrollTrigger: { trigger: root, start: 'top 85%' },
        });
      });
    },
    { scope },
  );
}
