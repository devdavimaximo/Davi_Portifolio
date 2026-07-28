/**
 * Base dictionary. Every user-facing string lives here — never inline in a
 * component. The exported shape is what other locales must satisfy.
 */
export const en = {
  a11y: {
    skipToContent: 'Skip to content',
  },
  home: {
    title: 'Home',
    heading: 'Davi Maximo',
  },
} as const;

export type Dictionary = typeof en;
