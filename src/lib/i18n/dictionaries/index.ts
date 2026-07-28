import type { Locale } from '../config';
import { ptBr, type Dictionary } from './pt-br';

export const dictionaries: Record<Locale, Dictionary> = { 'pt-BR': ptBr };

export type { Dictionary };
