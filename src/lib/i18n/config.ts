/**
 * i18n configuration. English is the base locale; adding a locale means adding
 * a dictionary that satisfies the `Dictionary` shape — TypeScript then reports
 * every missing key.
 */

export const locales = ['en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
