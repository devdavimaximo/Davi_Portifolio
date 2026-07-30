import styles from './AboutSection.module.css';

/**
 * Intrinsic size of the photo, declared so the section never shifts while the
 * image loads. It is the file's own size — the framing lives in the file, and
 * the CSS box only decides how large it is drawn.
 */
const WIDTH = 1086;
const HEIGHT = 1448;

export interface AboutPortraitProps {
  readonly alt: string;
}

/**
 * The portrait, standing in a technical plate: a hairline grid whose top rule
 * the head deliberately breaks, so the figure reads as placed in the layout
 * rather than pasted over it.
 *
 * One file at every density, deliberately. Serving a separately cropped file
 * per density once shipped two different framings of the same person — the
 * figure rendered noticeably smaller on non-retina screens than on retina.
 * The photo is the source of truth; it is not re-cut to fit the layout.
 *
 * It sits below the fold, so it is lazy and never competes with the hero.
 */
export function AboutPortrait({ alt }: AboutPortraitProps) {
  return (
    <figure className={styles.portrait}>
      <div className={styles.plate} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <img
        className={styles.image}
        src="/portrait.webp"
        alt={alt}
        width={WIDTH}
        height={HEIGHT}
        loading="lazy"
        decoding="async"
        data-about-portrait=""
      />
    </figure>
  );
}
