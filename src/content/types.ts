/**
 * Shape of the showcase content. Content is data, not markup: adding a case
 * study must never require touching a component.
 */

export interface ProjectImage {
  readonly src: string;
  /** Descriptive alt text. Empty string only for purely decorative images. */
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
}

export interface Project {
  /** URL-safe identifier, also used as the route segment. */
  readonly slug: string;
  readonly title: string;
  /** One-line summary, reused as the route meta description. */
  readonly summary: string;
  readonly year: number;
  readonly role: string;
  readonly stack: readonly string[];
  readonly cover: ProjectImage;
  readonly links: readonly ProjectLink[];
  /** Hidden from listings and excluded from the sitemap. */
  readonly draft?: boolean;
}
