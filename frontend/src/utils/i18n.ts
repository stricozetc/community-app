import * as i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';
import * as reactI18nextModule from 'react-i18next';
import { i18nProps } from 'react-i18next/src/I18n';

export interface I18nInitOptions extends i18n.InitOptions {
  react: i18n.ReactOptions | i18nProps;
}

const localization = require('locales/localization.json');

const options: I18nInitOptions = {
  defaultNS: 'translations',
  resources: {
    en: {
      translations: localization.en
    },
    ru: {
      translations: localization.ru
    }
  },
  /* lng: 'en', */
  fallbackLng: 'en',
  debug: true,
  /* ns: ['translations'],
  defaultNS: 'translations', */
  keySeparator: false,

  react: {
    wait: true
    /* bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default' */
  }
};

export const i18nInstance = i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init(options, (message: string) => message);
