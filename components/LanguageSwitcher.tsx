'use client';

import { usePathname, useRouter } from 'next/navigation';
import i18n from '../lib/i18nClient';
import { localeFromPathname, withLocalePath, type SiteLocale } from '../lib/locale-path';

export default function LanguageSwitcher() {
  const pathname = usePathname(); // e.g. "/chairs" or "/fr/chairs"
  const router = useRouter();

  const currentLang = localeFromPathname(pathname);

  const changeLanguage = (newLang: SiteLocale) => {
    if (newLang === currentLang) return;
    i18n.changeLanguage(newLang);
    router.push(withLocalePath(pathname, newLang));
  };

  return (
    <div className='flex items-center gap-0.5' aria-label='Language selector'>
      {(['en', 'fr', 'es'] as SiteLocale[]).map((locale) => (
        <button
          key={locale}
          type='button'
          onClick={() => changeLanguage(locale)}
          aria-pressed={locale === currentLang}
          className={`p-2 text-xs ${locale === currentLang ? 'font-semibold underline underline-offset-4' : ''}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
