/**
 * The home's sections, in page order — what the site navigation points at.
 *
 * Each id is both the section's DOM anchor and its key in the dictionary, so a
 * nav entry reads its number and name (`t[id].index`, `t[id].label`) from the
 * same strings the section heading prints. The navigation cannot call the
 * third section "Skills" while the section itself says "Stack" — and renaming
 * a dictionary key fails the build at every nav that reads it.
 */
export const siteSections = ['about', 'works', 'skills', 'contact'] as const;

export type SiteSectionId = (typeof siteSections)[number];

/**
 * Where a nav entry goes. Always through the home route, never a bare `#id`:
 * on a case page a bare fragment points at nothing. `useRouteScroll` finishes
 * the job after a client-side navigation.
 */
export const sectionHref = (id: SiteSectionId): string => `/#${id}`;
