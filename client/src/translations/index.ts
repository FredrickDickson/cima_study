import { en } from './en';
import { fr } from './fr';
import { es } from './es';
import { ar } from './ar';
import { zh } from './zh';
import type { Language } from '../lib/i18n';

export const translations = {
  en,
  fr,
  es,
  ar,
  zh
} as const;

export type TranslationKeys = typeof en;

// Helper function to get nested translation values
export function getTranslation(
  translations: TranslationKeys,
  key: string
): string {
  return key.split('.').reduce((obj: any, k) => obj?.[k], translations) || key;
}