import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector"
import translationEn from "./locales/en/en.json"
import translationSr from './locales/sr/sr.json';


const resources = {
  en: {
    translation: translationEn
  },
  rs: {
    translation: translationSr
  }
};

i18n
  .use(initReactI18next) 
  .use(detector)
  .init({
    resources,
    fallbackLng:"sr",
    lng:"rs",

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;