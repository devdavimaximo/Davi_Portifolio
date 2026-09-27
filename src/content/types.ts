/**
 * Shape of the showcase content. Content is data, not markup: adding a case
 * study must never require touching a component.
 *
 * These cases are argued, not shown. The systems behind them are internal or
 * client-owned, so there is no screen to put on a slide — which is why nothing
 * here carries a cover image. What carries a case instead is the reasoning:
 * the state before it, the decision taken, what that decision gave up, and what
 * changed afterwards.
 */

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
}

/**
 * One layer of the stack, as a spec-sheet row.
 *
 * Grouped by layer rather than listed flat, and each group carries a line of
 * context: a bare list of tool names says what was installed, not what was
 * built with it. There is deliberately no proficiency score — a self-assigned
 * "React 80%" is unfalsifiable, and the cases are the evidence instead.
 */
export interface SkillGroup {
  /** Stable identifier, never shown — safe to reorder the list around it. */
  readonly id: string;
  readonly label: string;
  readonly items: readonly string[];
  /** What this layer actually does in the systems behind the cases. */
  readonly note: string;
}

/**
 * A public profile where a visitor can reach the author.
 *
 * E-mail is deliberately not one of these: it is the secondary channel, reached
 * through `siteConfig.author.email`, and it is not a profile a search engine
 * can tie to a person.
 */
export interface ContactChannel {
  /** Stable identifier, never shown — safe to reorder the list around it. */
  readonly id: string;
  /** Name of the network as the visitor knows it, e.g. "LinkedIn". */
  readonly label: string;
  /** The address as it is typeset on the page, e.g. "in/davimaximo". */
  readonly handle: string;
  readonly href: string;
}

/**
 * The channels, main one first. A non-empty tuple rather than an array with a
 * `primary` flag: a flag allows zero or two main channels, the tuple cannot.
 */
export type ContactChannels = readonly [ContactChannel, ...ContactChannel[]];

/**
 * The downloadable résumé. Format and size are written for the reader, like a
 * case's metric, and shown beside the link: a visitor on mobile data is owed
 * the weight of a file before tapping it.
 */
export interface Resume {
  /** Site-relative path of the file under `public/`. */
  readonly href: string;
  /** Name the file is saved under, set through the link's `download`. */
  readonly fileName: string;
  readonly format: string;
  readonly size: string;
}

/**
 * The headline figure of a case. Kept as a string rather than a number because
 * these are written for a reader, not computed: "−83%", "12 mil/dia", "4 → 1".
 */
export interface ProjectMetric {
  readonly value: string;
  /** What the figure measures, e.g. "no tempo de fechamento de caixa". */
  readonly label: string;
}

/** The three beats every case is told in. */
export interface ProjectNarrative {
  /** The state that justified the work — not the feature that was asked for. */
  readonly problem: string;
  readonly decision: string;
  readonly outcome: string;
}

export interface Project {
  /** URL-safe identifier, also used as the route segment. */
  readonly slug: string;
  readonly title: string;
  /** One-line summary, reused as the route meta description. */
  readonly summary: string;
  readonly role: string;
  readonly stack: readonly string[];
  readonly narrative: ProjectNarrative;
  /**
   * Anonymised description of who ran the system, for cases where the client
   * cannot be named — "distribuidora de médio porte".
   */
  readonly client?: string;
  /** Optional: not every case ends in a figure worth putting in large type. */
  readonly metric?: ProjectMetric;
  readonly links?: readonly ProjectLink[];
  /** Hidden from listings and excluded from the sitemap. */
  readonly draft?: boolean;
}
