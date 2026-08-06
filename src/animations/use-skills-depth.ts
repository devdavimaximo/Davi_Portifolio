import type { RefObject } from 'react';

import { gsap, useGSAP } from './gsap';
import { easing } from './motion-tokens';

/** The spine the layers hang from. */
const AXIS = '[data-skills-axis]';

/**
 * Draws the depth axis of the skills section as the reader descends it.
 *
 * Scrubbed rather than played: the line is tied to the scroll position, so it
 * grows exactly as far as the reader has gone. That is the whole idea of the
 * section — the movement *is* the descent through the stack, not decoration
 * laid over it. Only `scaleY` is written, so the pass stays on the compositor.
 *
 * The layers themselves are not animated here. They carry `data-reveal-trail`
 * and arrive with the shared section choreography, so this section speaks the
 * same entrance language as every other one.
 *
 * There is no reduced-motion branch on purpose: the axis is drawn at full
 * height by CSS, and only the no-preference branch ever shrinks it. A visitor
 * who asks for less movement gets the finished drawing rather than a line that
 * never arrives — and a tween that fails to run can never leave the section
 * looking unfinished.
 */
export function useSkillsDepth(scope: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          AXIS,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: easing.linear,
            scrollTrigger: {
              trigger: root,
              start: 'top 70%',
              /* `bottom bottom`, and not a fraction of the viewport: while this
                 is the last section on the page, its bottom can never travel
                 higher than the viewport's own bottom, so an end of
                 `bottom 80%` was unreachable and the axis froze at 0.85 —
                 the drawing never closed, right where "Fundação" is written. */
              end: 'bottom bottom',
              scrub: true,
            },
          },
        );
      });
    },
    { scope },
  );
}
