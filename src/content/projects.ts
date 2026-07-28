import type { Project } from './types';

/** Showcase source of truth. Populated in F3. */
export const projects: readonly Project[] = [];

export function getPublishedProjects(): readonly Project[] {
  return projects.filter((project) => !project.draft);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
