import type { RefObject } from 'react';

import { gsap, useGSAP } from './gsap';
import {
  duration,
  easing,
  reducedMotionDurationScale,
  stagger,
} from './motion-tokens';

/** Masked headline lines revealed on entrance. */
const LINE = '[data-hero-line]';
/** Secondary elements that fade in after the headline. */
const FADE = '[data-hero-fade]';
/** Whole content block, scrubbed away as the hero scrolls out. */
const CONTENT = '[data-hero-content]';

/**
 * Entrance choreography and scroll-out fade of the hero.
 *
 * Runs inside `useGSAP`, so every tween and ScrollTrigger created here is
 * reverted automatically on unmount. The reduced-motion variant keeps the
 * same reveal order but replaces movement with a quick, calm fade.
 */
export function useHeroIntro(scope: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline()
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
          );

        // Inert while the hero is the only section on the page; it starts
        // working the moment the first section lands below the fold.
        gsap.to(CONTENT, {
          autoAlpha: 0,
          y: -64,
          ease: easing.linear,
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: '75% top',
            scrub: true,
          },
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from([LINE, FADE], {
          autoAlpha: 0,
          duration: duration.base * reducedMotionDurationScale,
          ease: easing.standard,
          stagger: stagger.tight,
        });
      });
    },
    { scope },
  );
}
