import type { RefObject } from 'react';

import { gsap, useGSAP } from './gsap';
import {
  duration,
  easing,
  reducedMotionDurationScale,
  stagger,
} from './motion-tokens';

/** Masked headline lines, revealed when the section enters the viewport. */
const LINE = '[data-about-line]';
/** Supporting copy that fades in behind the headline. */
const FADE = '[data-about-fade]';
/** The portrait, which also drifts against the copy while the section passes. */
const PORTRAIT = '[data-about-portrait]';

/** Fraction of its own height the portrait travels across the whole section. */
const PARALLAX_REACH = 4;

/**
 * Entrance choreography of the about section.
 *
 * Reuses the hero's vocabulary — masked lines first, supporting copy behind it —
 * so the two sections read as one system. The portrait adds a slow, scrubbed
 * drift that only ever writes `transform`, keeping the pass on the compositor.
 *
 * Everything is created inside `useGSAP`, so tweens and ScrollTriggers are
 * reverted on unmount. Visitors who prefer reduced motion keep the same reveal
 * order as a short fade, with no drift at all.
 */
export function useAboutReveal(scope: RefObject<HTMLElement | null>): void {
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
            PORTRAIT,
            {
              autoAlpha: 0,
              scale: 1.06,
              duration: duration.slower,
              ease: easing.expressive,
            },
            0,
          );

        // Subtle enough to read as depth rather than as an effect: the figure
        // shifts inside its plate while the plate itself stays put.
        gsap.fromTo(
          PORTRAIT,
          { yPercent: -PARALLAX_REACH },
          {
            yPercent: PARALLAX_REACH,
            ease: easing.linear,
            scrollTrigger: {
              trigger: scope.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from([LINE, FADE, PORTRAIT], {
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
