'use client';

import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      debug: true,
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      react: {
        useSuspense: true,
      },
    });
}

export default i18n;
