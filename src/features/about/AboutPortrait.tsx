import styles from './AboutSection.module.css';

/** Intrinsic size of the source file, declared so the section never shifts. */
const WIDTH = 300;
const HEIGHT = 400;

export interface AboutPortraitProps {
  readonly alt: string;
}

/**
 * The portrait, standing in a technical plate: a hairline grid whose top rule
 * the head deliberately breaks, so the figure reads as placed in the layout
 * rather than pasted over it.
 *
 * WebP first with the PNG as fallback — same pixels, a seventh of the bytes.
 * It sits below the fold, so it is lazy and never competes with the hero.
 */
export function AboutPortrait({ alt }: AboutPortraitProps) {
  return (
    <figure className={styles.portrait}>
      <div className={styles.plate} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <picture className={styles.picture}>
        <source srcSet="/portrait.webp" type="image/webp" />
        <img
          className={styles.image}
          src="/portrait.png"
          alt={alt}
          width={WIDTH}
          height={HEIGHT}
          loading="lazy"
          decoding="async"
          data-about-portrait=""
        />
      </picture>
    </figure>
  );
}
