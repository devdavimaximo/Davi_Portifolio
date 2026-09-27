import type { Resume } from './types';

/**
 * The résumé offered in the contact section, or `undefined` when there is none
 * to offer — the section then leaves the download out rather than linking to a
 * file that is not there, which would be a 404 in the middle of the last CTA.
 *
 * The URL carries no year on purpose: a link someone saved keeps working after
 * the file is replaced. When it is, `size` has to be updated with it.
 */
export const resume: Resume | undefined = {
  href: '/cv/davi-maximo-quoos-curriculo.pdf',
  fileName: 'Davi-Maximo-Quoos-Curriculo.pdf',
  format: 'PDF',
  // Non-breaking space: a figure is never split from its unit across lines.
  size: '51 KB',
};
