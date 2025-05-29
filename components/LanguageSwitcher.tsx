'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../lib/i18nClient';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const triggerGoogleTranslate = (langCode: string) => {
    const googleFrame = document.querySelector('iframe.goog-te-menu-frame') as HTMLIFrameElement;
    if (!googleFrame?.contentDocument) return;

    const innerDoc = googleFrame.contentDocument;
    const langButtons = innerDoc.querySelectorAll('.goog-te-menu2-item span.text');

    langButtons?.forEach((el) => {
      if (
        (langCode === 'fr' && el.textContent?.toLowerCase().includes('french')) ||
        (langCode === 'en' && el.textContent?.toLowerCase().includes('english'))
      ) {
        (el as HTMLElement).click();
      }
    });
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);

    if (!pathname) return;

    router.replace(`/${newLang}${pathname}`);

    setTimeout(() => triggerGoogleTranslate(newLang), 500);
  };

  return (
    <button onClick={toggleLanguage}>
      {i18n.language === 'en' ? 'FR' : 'EN'}
    </button>
  );
}
