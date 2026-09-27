import type { ContactChannels } from './types';

/**
 * Where to find the author, main channel first.
 *
 * One source, three readers: the contact section, the footer and the `sameAs`
 * of the `Person` JSON-LD. Adding a network here is enough for all three —
 * they can never list different profiles.
 *
 * The order is the argument, as it is in `skills.ts`: the first entry is the
 * one the contact section sets in display type, so moving an entry to the top
 * changes which channel the page is asking the visitor to use.
 */
export const contactChannels: ContactChannels = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/davimaximoquoos',
    href: 'https://www.linkedin.com/in/davimaximoquoos/',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'devdavimaximo',
    href: 'https://github.com/devdavimaximo',
  },
];
