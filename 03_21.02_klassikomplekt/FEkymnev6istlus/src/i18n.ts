import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "nav": {
        "overview": "Overview",
        "map": "Athlete birthplaces"
      },

      "admin-nav": {
        "athletes": "Manage athletes",
      },

      "home": {
       //"all-categories": "All categories"
      }
    }
  },

  et: {
    translation: {
      "nav": {
        "overview": "Ülevaade",
        "map": "Sportlaste kasvukohad"
      },
      "home": {
        //"all-categories": "Kõik kategooriad"
      }
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "et", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;