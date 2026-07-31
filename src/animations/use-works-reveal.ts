import type { RefObject } from 'react';

import { gsap, useGSAP } from './gsap';
import {
  duration,
  easing,
  reducedMotionDurationScale,
  stagger,
} from './motion-tokens';

/** Masked headline lines of the section itself. */
const LINE = '[data-works-line]';
/** The section's own supporting chrome. */
const FADE = '[data-works-fade]';
/** One ledger row. */
const ENTRY = '[data-works-entry]';

/**
 * Entrance choreography of the showcase.
 *
 * Speaks the hero's and the about section's vocabulary — masked lines first,
 * supporting copy behind them — so all three read as one system.
 *
 * The rows are staggered from a single trigger rather than given one trigger
 * each: collapsed, the whole ledger is short enough to sit in one viewport, so
 * per-row triggers would all fire within a few pixels of each other and read as
 * a jumble. Opening a row is a state change, not part of this timeline — that
 * transition lives in CSS, next to the disclosure it belongs to.
 *
 * Only `transform` and `opacity` are animated, so the pass stays on the
 * compositor. Everything is created inside `useGSAP`, so tweens and
 * ScrollTriggers are reverted on unmount. Visitors who prefer reduced motion
 * keep the same reveal order as a short fade, with no travel.
 */
export function useWorksReveal(scope: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: scope.current, start: 'top 70%' },
          })
          .from(LINE, {
            yPercent: 110,
            duration: duration.slower,
            ease: easing.expressive,
            stagger: stagger.loose,
          })
          .from(
            FADE,
            {
              autoAlpha: 0,
              y: 24,
              duration: duration.slow,
              ease: easing.standard,
              stagger: stagger.base,
            },
            `-=${duration.slow}`,
          )
          .from(
            ENTRY,
            {
              autoAlpha: 0,
              y: 28,
              duration: duration.slow,
              ease: easing.standard,
              stagger: stagger.base,
            },
            `-=${duration.slow * 0.6}`,
          );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from([LINE, FADE, ENTRY], {
          autoAlpha: 0,
          duration: duration.base * reducedMotionDurationScale,
          ease: easing.standard,
          stagger: stagger.tight,
          scrollTrigger: { trigger: scope.current, start: 'top 85%' },
        });
      });
    },
    { scope },
  );
}
