import * as i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';
import * as reactI18nextModule from 'react-i18next';
import { i18nProps } from 'react-i18next/src/I18n';

import * as en  from '../locales/en.json';
import * as ru from '../locales/ru.json';

// tslint:disable-next-line:interface-name
export interface I18nInitOptions extends i18n.InitOptions {
  react: i18n.ReactOptions | i18nProps;
}

const options: I18nInitOptions = {
  defaultNS: 'translations',
  resources: {
    en: {
      translations: en
    },
    ru: {
      translations: ru
    }
  },
  fallbackLng: 'en',

  react: {
    wait: true
  }
};

export const i18nInstance = i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init(options, (message: string) => message);
