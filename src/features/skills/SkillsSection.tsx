import { useRef } from 'react';

import { useSectionReveal } from '../../animations/use-section-reveal';
import { useSkillsDepth } from '../../animations/use-skills-depth';
import { SectionHeading } from '../../components/SectionHeading';
import { skillGroups } from '../../content/skills';
import { useTranslation } from '../../lib/i18n';
import styles from './SkillsSection.module.css';

/** Names the section for `aria-labelledby` and for the header's in-page link. */
const HEADING_ID = 'skills-heading';

/**
 * The stack, drawn as a section through the system.
 *
 * Not a list of tools, and deliberately not a second ledger: one continuous
 * depth axis, with each layer hanging off it as a node, descending from the
 * surface the client touches to the foundation holding it up. The order in
 * `skills.ts` is what the drawing says, so it stays content's decision rather
 * than this component's.
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

          <p className={styles.axisLabel}>{t.skills.surface}</p>

          {/* Ordered, and truthfully so: these layers are read top to bottom as
              depth, which is what an ordered list means. */}
          <ol className={styles.layers} aria-label={t.skills.depthLabel}>
            {skillGroups.map((group) => (
              <li key={group.id} className={styles.layer} data-reveal-trail="">
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

          <p className={styles.axisLabel}>{t.skills.foundation}</p>
        </div>
      </div>
    </section>
  );
}
