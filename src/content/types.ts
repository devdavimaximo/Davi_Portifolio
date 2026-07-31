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
