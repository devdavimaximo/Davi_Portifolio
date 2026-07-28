/**
 * Motion design tokens — the timing vocabulary of the whole site.
 *
 * These mirror the custom properties in `src/styles/tokens.css`: CSS consumes
 * the variables, GSAP consumes these constants, and both stay in sync. Never
 * hardcode a duration or an easing curve inside a component or a timeline.
 */

/** Durations in seconds, the unit GSAP expects. */
export const duration = {
  instant: 0.12,
  fast: 0.24,
  base: 0.4,
  slow: 0.7,
  slower: 1.1,
} as const;

/** Named easings. Keep the set small so movement reads as one system. */
export const easing = {
  /** Default UI easing: quick out, soft landing. */
  standard: 'power3.out',
  /** Elements leaving the screen. */
  exit: 'power2.in',
  /** Large, expressive reveals. */
  expressive: 'expo.out',
  /** Continuous / looping motion. */
  linear: 'none',
} as const;

/** Stagger steps for grouped reveals, in seconds. */
export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;

/**
 * Scale applied to every duration when the visitor prefers reduced motion:
 * the choreography survives, the movement is quicker and calmer.
 */
export const reducedMotionDurationScale = 0.4;

export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
