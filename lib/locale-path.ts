export type SiteLocale = 'en' | 'fr' | 'es';

export function toSiteLocale(locale: string): SiteLocale {
  return locale === 'fr' || locale === 'es' ? locale : 'en';
}

export function localeFromPathname(pathname: string): SiteLocale {
  if (pathname === '/fr' || pathname.startsWith('/fr/')) return 'fr';
  if (pathname === '/es' || pathname.startsWith('/es/')) return 'es';
  return 'en';
}

export function withLocalePath(pathname: string, locale: SiteLocale): string {
  const cleanPath = pathname.replace(/^\/(fr|es)(?=\/|$)/, '') || '/';
  if (locale === 'en') return cleanPath;
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

export function withSpanishPath(pathname: string, locale: SiteLocale): string {
  return locale === 'es' ? withLocalePath(pathname, locale) : pathname;
}
