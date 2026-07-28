import type { ViteReactSSGOptions } from 'vite-react-ssg';

/** `vite-react-ssg` reads `ssgOptions` from the Vite config but ships no augmentation for it. */
declare module 'vite' {
  interface UserConfig {
    ssgOptions?: Partial<ViteReactSSGOptions>;
  }
}
