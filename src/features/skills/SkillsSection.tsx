import { type CSSProperties, useRef } from 'react';

import { useSectionReveal } from '../../animations/use-section-reveal';
import { useSkillsDepth } from '../../animations/use-skills-depth';
import { SectionHeading } from '../../components/SectionHeading';
import { skillGroups } from '../../content/skills';
import { useTranslation } from '../../lib/i18n';
import styles from './SkillsSection.module.css';

/** Names the section for `aria-labelledby` and for the header's in-page link. */
const HEADING_ID = 'skills-heading';

/**
 * How far along the spectrum a layer sits: 0 at the first layer listed, 1 at
 * the last. Computed from the list's own length rather than written into the
 * content, so adding or cutting a layer re-spaces the ramp instead of leaving a
 * gap in it. A single layer has no gradient to sit on and stays at 0.
 */
const depthOf = (position: number, total: number): number =>
  total > 1 ? position / (total - 1) : 0;

/**
 * The stack, drawn as a section through the system.
 *
 * Not a list of tools, and deliberately not a second ledger: one continuous
 * depth axis, with each layer hanging off it as a node, rising from the
 * foundation that holds the system up to the surface the client touches. The
 * order in `skills.ts` is what the drawing says, so it stays content's decision
 * rather than this component's.
 *
 * No proficiency bars and no wall of framework logos — both claim something
 * they cannot back. The argument here is which layer a tool belongs to and what
 * that layer carries; the cases are the evidence.
 *
 * The drawing is decoration in the strict sense: the axis and the markers are
 * `aria-hidden`, and what assistive technology gets is an ordered list of
 * layers, each a heading with its tools and its reasoning. Nothing carrying
 * meaning is drawn only in lines.
 */
export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useSectionReveal(sectionRef);
  useSkillsDepth(sectionRef);

  if (skillGroups.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={styles.skills}
      aria-labelledby={HEADING_ID}
    >
      <div className={styles.inner}>
        <SectionHeading
          index={t.skills.index}
          label={t.skills.label}
          lines={t.skills.headlineLines}
          headingId={HEADING_ID}
        />

        <div className={styles.depth} data-reveal-fade="">
          <span className={styles.axis} data-skills-axis="" aria-hidden="true" />

          {/* Foundation first: the drawing rises from what holds the system up
              to what the client touches, which is the order `skills.ts` lists
              the layers in. The two ends and the list cannot be reordered
              independently — together they are the claim the section makes. */}
          <p className={`${styles.axisLabel} ${styles.foundation}`}>
            {t.skills.foundation}
          </p>

          {/* Ordered, and truthfully so: these layers are read top to bottom as
              depth, which is what an ordered list means. */}
          <ol className={styles.layers} aria-label={t.skills.depthLabel}>
            {skillGroups.map((group, position) => (
              <li
                key={group.id}
                className={styles.layer}
                data-reveal-trail=""
                /* The one number the stylesheet cannot work out for itself:
                   where this layer falls on the spectrum. Everything else about
                   the colour is derived from it in CSS. */
                style={
                  {
                    '--layer-depth': depthOf(position, skillGroups.length),
                  } as CSSProperties
                }
              >
                <span className={styles.marker} aria-hidden="true" />

                <h3 className={styles.layerName}>{group.label}</h3>

                {/* Tool names are identifiers, not prose: browser
                    auto-translation turns them into words that no longer name
                    anything. */}
                <ul className={styles.items} translate="no">
                  {group.items.map((item) => (
                    <li key={item} className={styles.item}>
                      {item}
                    </li>
                  ))}
                </ul>

                <p className={styles.note}>{group.note}</p>
              </li>
            ))}
          </ol>

          <p className={`${styles.axisLabel} ${styles.surface}`}>
            {t.skills.surface}
          </p>
        </div>
      </div>
    </section>
  );
}
