/**
 * Base dictionary. Every user-facing string lives here — never inline in a
 * component. The exported shape is what other locales must satisfy.
 */
export const en = {
  a11y: {
    skipToContent: 'Skip to content',
  },
  header: {
    wordmark: 'Davi Maximo',
    contact: "Let's talk",
  },
  home: {
    title: 'Home',
  },
  hero: {
    eyebrow: 'Davi Maximo — Front-end Developer',
    headlineLines: ['Immersive by design.', 'Fast by default.'],
    description:
      'I build interfaces where art direction meets engineering — motion, 3D and obsessive detail that never cost a frame.',
    stack: 'React · TypeScript · GSAP · Three.js',
    contactCta: 'Get in touch',
  },
} as const;

export type Dictionary = typeof en;
