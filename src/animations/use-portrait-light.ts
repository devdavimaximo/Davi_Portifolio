import type { RefObject } from 'react';

import { gsap, useGSAP } from './gsap';
import { duration, easing } from './motion-tokens';

/** The light layer standing behind the figure. */
const GLOW = '[data-about-glow]';

/**
 * How far the light travels from centre, in pixels, once the pointer reaches
 * the edge of the screen. Small on purpose: past roughly this the layer stops
 * reading as light falling on the figure and starts reading as a shape sliding
 * around behind it.
 */
const REACH_X = 16;
const REACH_Y = 10;

/**
 * Leans the light behind the portrait toward the pointer.
 *
 * The hero's scene is lit by where the visitor's cursor is, and that is the one
 * behaviour that makes it feel inhabited rather than played back. This gives
 * the about section the same behaviour, on the one element there that is
 * already a light: the figure is lit from wherever the reader is standing.
 *
 * Nothing here reads layout. The pointer is normalised against the viewport
 * rather than against a measured box, because calling `getBoundingClientRect`
 * on every pointer event is how a smooth effect turns into a forced reflow on
 * every frame. `quickTo` writes `transform` only, batches on GSAP's ticker, and
 * is interruptible mid-travel, so fast movement never queues up.
 *
 * Only for a fine pointer that has not asked for less motion. A touch screen
 * has no cursor to follow, so the light simply stays where it was composed —
 * the section is not diminished by it, it just does not chase anything.
 */
export function usePortraitLight(scope: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(
        '(prefers-reduced-motion: no-preference) and (pointer: fine)',
        () => {
          const glow = root.querySelector<HTMLElement>(GLOW);
          if (!glow) return undefined;

          const settle = { duration: duration.slow, ease: easing.standard };
          const moveX = gsap.quickTo(glow, 'x', settle);
          const moveY = gsap.quickTo(glow, 'y', settle);

          const controller = new AbortController();
          const { signal } = controller;
          const listener = { passive: true, signal } as const;

          root.addEventListener(
            'pointermove',
            (event) => {
              const x = (event.clientX / window.innerWidth) * 2 - 1;
              const y = (event.clientY / window.innerHeight) * 2 - 1;
              moveX(x * REACH_X);
              moveY(y * REACH_Y);
            },
            listener,
          );

          // Settles back to composed rather than freezing wherever the reader
          // happened to leave: the section at rest is the section as designed.
          root.addEventListener(
            'pointerleave',
            () => {
              moveX(0);
              moveY(0);
            },
            listener,
          );

          return () => controller.abort();
        },
      );
    },
    { scope },
  );
}
