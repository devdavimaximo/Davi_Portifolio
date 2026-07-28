import type { Locale } from '../config';
import { en, type Dictionary } from './en';

export const dictionaries: Record<Locale, Dictionary> = { en };

export type { Dictionary };
