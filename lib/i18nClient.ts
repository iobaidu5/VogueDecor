'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from '../public/locales/en/common.json';
import frCommon from '../public/locales/fr/common.json';
import esCommon from '../public/locales/es/common.json';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { common: enCommon },
      fr: { common: frCommon },
      es: { common: esCommon },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;
