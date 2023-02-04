import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
  react: {
    useSuspense: false,
  },
});

export default i18n;
