'use client';

import { usePathname, useRouter } from 'next/navigation';
import i18n from '../lib/i18nClient';

export default function LanguageSwitcher() {
  const pathname = usePathname(); // e.g. "/chairs" or "/fr/chairs"
  const router = useRouter();

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === 'en' ? 'fr' : 'en';

    i18n.changeLanguage(newLang);

    let newPath = pathname;

    if (newLang === 'fr' && !pathname.startsWith('/fr')) {
      newPath = `/fr${pathname}`;
    } else if (newLang === 'en' && pathname.startsWith('/fr')) {
      newPath = pathname.replace(/^\/fr/, '');
    }

    router.push(newPath || '/');
  };


  return (
    <button onClick={toggleLanguage} className='p-2'>
      {i18n.language === 'en' ? 'FR' : 'EN'}
    </button>
  );
}
