import type { RefObject } from 'react';

import { gsap, useGSAP } from './gsap';
import { duration, easing } from './motion-tokens';

/** The lit rule under the main channel. */
const SIGNAL = '[data-contact-signal]';

/**
 * Draws the rule under the main contact channel once, as it comes into view.
 *
 * It is the one place the hero's spectrum gathers in this section: the light
 * that the sections above spread along an axis and across a figure converges
 * here into a single line under the address the page is asking the reader to
 * use. Drawn from the leading edge, the same direction the works ledger lights
 * its rules — continuity, not a new effect.
 *
 * Played rather than scrubbed, unlike the skills axis: that line *is* the
 * descent, while this one only has to arrive. It also means the end of the
 * page cannot leave it half drawn — this is the last section, and a scrubbed
 * end tied to its bottom edge could never be reached.
 *
 * Only `scaleX`. No reduced-motion branch, for the same reason as the skills
 * axis: CSS draws the rule complete, and only the no-preference branch ever
 * collapses it, so a visitor who asks for less movement gets it finished.
 */
export function useContactSignal(scope: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      /* Resolved here rather than handed to GSAP as a string: a selector that
         slips out of the scope resolves against the whole document, which is
         the bug that once blanked every section under reduced motion. */
      const signal = scope.current?.querySelector(SIGNAL);
      if (!signal) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(signal, {
          scaleX: 0,
          duration: duration.slower,
          ease: easing.expressive,
          scrollTrigger: { trigger: signal, start: 'top 90%' },
        });
      });
    },
    { scope },
  );
}
