import en from '../public/locales/en/common.json';
import fr from '../public/locales/fr/common.json';
import es from '../public/locales/es/common.json';
import type { SiteLocale } from './locale-path';

const resources = { en, fr, es };

export function translatedProductTitle(title: string, locale: SiteLocale): string {
  const resource = resources[locale] as { products?: Record<string, string> };
  return resource.products?.[title] ?? title;
}
