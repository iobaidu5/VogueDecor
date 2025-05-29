import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';

if (!i18n.isInitialized) {
  i18n.use(HttpBackend).init({
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });
}

export default i18n;
