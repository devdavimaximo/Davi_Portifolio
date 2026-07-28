import { type RefObject, useEffect } from 'react';

/**
 * Touch devices have no hover, so a pointer-driven scene stays empty until the
 * visitor drags — and someone who only scrolls past never sees it at all. A
 * mouse needs no help: any movement already drives the scene.
 */
const TOUCH_QUERY = '(pointer: coarse)';

/** Seconds for one full horizontal sweep, and for the slower vertical drift. */
const SWEEP_PERIOD = 7;
const DRIFT_PERIOD = 4.4;

/** Fractions of the target box the synthetic path travels through. */
const SWEEP_CENTER = 0.5;
const SWEEP_REACH = 0.3;
const DRIFT_CENTER = 0.54;
const DRIFT_REACH = 0.14;

function pathPoint(elapsedSeconds: number, box: DOMRect): [number, number] {
  const sweep = Math.sin((elapsedSeconds / SWEEP_PERIOD) * Math.PI * 2);
  const drift = Math.cos((elapsedSeconds / DRIFT_PERIOD) * Math.PI * 2);

  return [
    box.left + box.width * (SWEEP_CENTER + SWEEP_REACH * sweep),
    box.top + box.height * (DRIFT_CENTER + DRIFT_REACH * drift),
  ];
}

/**
 * Drives a pointer-reactive scene on touch devices until the visitor takes
 * over, by dispatching synthetic `pointermove` events along a looping path.
 * The scene introduces itself instead of waiting on an interaction the device
 * cannot express, and the first real touch hands control back for good.
 *
 * Does nothing on devices with a fine pointer: there the hero already behaves
 * as designed and must not be second-guessed.
 *
 * @param sceneRef Root of the scene; events go to the `canvas` inside it,
 *   which is what the 3D runtime listens on.
 * @param enabled Whether the scene is loaded and on screen.
 */
export function usePointerAutoplay(
  sceneRef: RefObject<HTMLElement | null>,
  enabled: boolean,
): void {
  useEffect(() => {
    const target = sceneRef.current?.querySelector('canvas');
    if (!enabled || !target) return undefined;
    if (!window.matchMedia(TOUCH_QUERY).matches) return undefined;

    const controller = new AbortController();
    const { signal } = controller;

    // Cached so the per-frame loop never reads layout; the hero is full-bleed,
    // so only a resize can invalidate it.
    let box = target.getBoundingClientRect();
    let frame = 0;
    let startedAt = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      controller.abort();
    };

    // Real input always wins: synthetic events carry `isTrusted === false`, so
    // the takeover check cannot be tripped by this hook's own dispatches.
    const handleRealInput = (event: Event) => {
      if (event.isTrusted) stop();
    };

    const step = (now: number) => {
      if (startedAt === 0) startedAt = now;
      const [clientX, clientY] = pathPoint((now - startedAt) / 1000, box);

      target.dispatchEvent(
        new PointerEvent('pointermove', {
          pointerType: 'mouse',
          pointerId: 1,
          isPrimary: true,
          clientX,
          clientY,
          bubbles: true,
        }),
      );

      frame = requestAnimationFrame(step);
    };

    const options = { capture: true, signal } as const;
    window.addEventListener('pointerdown', handleRealInput, options);
    window.addEventListener('pointermove', handleRealInput, options);
    window.addEventListener(
      'resize',
      () => {
        box = target.getBoundingClientRect();
      },
      { passive: true, signal },
    );

    frame = requestAnimationFrame(step);

    return stop;
  }, [enabled, sceneRef]);
}
