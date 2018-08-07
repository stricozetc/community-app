import { i18n } from 'i18next';

export const getCurrentLanguage = (i18n: i18n): string => {
  return i18n.language.indexOf('-') !== -1 ?
    i18n.language.split('-')[0] :
    i18n.language;
};
