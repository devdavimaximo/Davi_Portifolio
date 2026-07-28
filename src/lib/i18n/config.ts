/**
 * i18n configuration. pt-BR is the base locale — the audience reads Portuguese,
 * even though the codebase is written in English. Adding a locale means adding a
 * dictionary that satisfies the `Dictionary` shape — TypeScript then reports
 * every missing key.
 */

export const locales = ['pt-BR'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pt-BR';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
