/**
 * The one place a case's URL is spelled out.
 *
 * Read by the route table, the pre-render list, the links on the index and the
 * canonical/JSON-LD of each case page — so the address a crawler is given, the
 * address that is built, and the address that is linked can never disagree.
 */

export const CASE_ROUTE_SEGMENT = 'trabalho';

export const caseRoutePath = (slug: string): string =>
  `/${CASE_ROUTE_SEGMENT}/${slug}`;
