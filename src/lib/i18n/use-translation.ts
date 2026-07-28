import { defaultLocale, type Locale } from './config';
import { dictionaries, type Dictionary } from './dictionaries';

export interface Translation {
  readonly locale: Locale;
  /** The active dictionary, fully typed — access keys directly: `t.home.heading`. */
  readonly t: Dictionary;
}

/**
 * Resolves the active dictionary.
 *
 * Deliberately synchronous and provider-free: with a single locale there is no
 * runtime state to share, and pre-rendering must not depend on client context.
 * When a second locale lands, this is the one place that gains a provider.
 */
export function useTranslation(locale: Locale = defaultLocale): Translation {
  return { locale, t: dictionaries[locale] };
}
