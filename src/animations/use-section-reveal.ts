import type { RefObject } from 'react';

import { gsap, useGSAP } from './gsap';
import {
  duration,
  easing,
  reducedMotionDurationScale,
  stagger,
} from './motion-tokens';

/** Masked headline lines — emitted by `<SectionHeading />`. */
const LINE = '[data-reveal-line]';
/** Supporting chrome that fades in behind the statement. */
const FADE = '[data-reveal-fade]';
/** Repeating rows a section is made of: ledger entries, skill groups, channels. */
const TRAIL = '[data-reveal-trail]';

/** How far into the fade the rows start arriving. */
const TRAIL_OVERLAP = 0.6;

/**
 * Everything the calm variant fades in, as ONE selector string.
 *
 * Deliberately not an array of the three constants. `useGSAP`'s scope resolves
 * a selector string against the section it was given, but strings nested inside
 * an array escape that scoping and resolve against the whole document — so each
 * section's reduced-motion tween was targeting every other section's elements
 * too. Three overlapping tweens later, the last from-state written won, and the
 * copy stayed at `autoAlpha: 0`: with `prefers-reduced-motion: reduce` the
 * sections rendered blank. Comma-joined, it is a single string again, and the
 * scope applies.
 */
const CALM = `${LINE}, ${FADE}, ${TRAIL}`;

/**
 * The entrance every section shares: masked lines first, supporting copy behind
 * them, then whatever rows the section is built from.
 *
 * This is the hero's vocabulary, and the about and works sections each carried
 * their own copy of it. One timeline means a fourth section cannot quietly
 * arrive with a slightly different rhythm.
 *
 * Only `transform` and `opacity` are animated, so the pass stays on the
 * compositor. Everything is created inside `useGSAP`, so tweens and
 * ScrollTriggers are reverted on unmount. Visitors who prefer reduced motion
 * keep the same reveal order as a short fade, with no travel.
 *
 * Sections without rows simply render none: the trail is skipped when nothing
 * matches, rather than handed to GSAP as an empty target.
 */
export function useSectionReveal(scope: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const hasTrail = root.querySelector(TRAIL) !== null;
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap
          .timeline({ scrollTrigger: { trigger: root, start: 'top 70%' } })
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

        if (hasTrail) {
          timeline.from(
            TRAIL,
            {
              autoAlpha: 0,
              y: 28,
              duration: duration.slow,
              ease: easing.standard,
              stagger: stagger.base,
            },
            `-=${duration.slow * TRAIL_OVERLAP}`,
          );
        }
      });

      /**
       * The calm variant: the section arrives as one quiet fade.
       *
       * Deliberately unstaggered, and that is a correctness fix rather than a
       * taste call. Measured in the browser with reduced motion on, the
       * staggered version stopped after its first two targets and left the
       * rest of the section at `autoAlpha: 0` permanently — the about, works
       * and skills sections each rendered blank for exactly the visitors who
       * asked for less movement. It reproduced through a timeline as well as
       * through a bare tween, and it survived a 25-second wait, so it is not
       * the reveal still being in flight. Dropping the stagger makes every
       * target share one start and one end, and all of them finish.
       *
       * TODO(F5): the root cause is still open — likely GSAP's stagger
       * interacting with a starved main thread, since the hero's 3D scene
       * holds it for seconds at a time. Worth settling before F5 adds more
       * timelines on top of this one.
       */
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from(CALM, {
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
