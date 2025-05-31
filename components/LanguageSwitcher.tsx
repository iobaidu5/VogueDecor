'use client';

import React, { useEffect } from 'react';
import i18n from '../lib/i18nClient';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { t } = useTranslation();

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
    setTimeout(() => triggerGoogleTranslate(newLang), 1000); 
  };

  return (
    <button onClick={toggleLanguage}>
      {i18n.language === 'en' ? 'FR' : 'EN'}
    </button>
  );
}
