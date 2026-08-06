import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  /** Position of the section in the page, pre-formatted: "01", "02"… */
  readonly index: string;
  readonly label: string;
  /** Written as separate lines, and revealed as separate lines. */
  readonly lines: readonly string[];
  /** What the section's own `aria-labelledby` points at. */
  readonly headingId: string;
  /**
   * Placement classes from the owning section. Both parts are rendered as
   * siblings rather than wrapped in a container, so a section that lays itself
   * out on a grid can still address each part as its own cell — which is why
   * this returns a fragment.
   *
   * Explicitly `| undefined`, not just optional: with `exactOptionalPropertyTypes`
   * an omissible property still may not *receive* `undefined`, and a CSS-module
   * lookup is `string | undefined` under `noUncheckedIndexedAccess`.
   */
  readonly labelClassName?: string | undefined;
  readonly headlineClassName?: string | undefined;
}

const classes = (...values: readonly (string | undefined)[]): string =>
  values.filter(Boolean).join(' ');

/**
 * The numbered rule and the masked statement every section opens with.
 *
 * Carries the reveal hooks (`data-reveal-*`) with it, so a section gets the
 * shared choreography from `useSectionReveal` by rendering this — the markup
 * and the timeline cannot drift apart into "the heading animates here but not
 * there".
 */
export function SectionHeading({
  index,
  label,
  lines,
  headingId,
  labelClassName,
  headlineClassName,
}: SectionHeadingProps) {
  return (
    <>
      <p className={classes(styles.label, labelClassName)} data-reveal-fade="">
        <span className={styles.index}>{index}</span>
        {label}
      </p>

      <h2
        id={headingId}
        className={classes(styles.headline, headlineClassName)}
      >
        {lines.map((line) => (
          <span key={line} className={styles.lineMask}>
            <span className={styles.line} data-reveal-line="">
              {line}
            </span>
          </span>
        ))}
      </h2>
    </>
  );
}
