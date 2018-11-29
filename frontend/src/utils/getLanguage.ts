import { i18n } from 'i18next';

// tslint:disable-next-line:no-shadowed-variable
export const getCurrentLanguage = (i18n: i18n): string => {
  return i18n.language.indexOf('-') !== -1 ?
    i18n.language.split('-')[0] :
    i18n.language;
};

export const getCurrentLanguageFromLocalStorage = (): string => {
  const language = localStorage.getItem('i18nextLng');

  return language ? language.indexOf('-') !== -1 ?
    language.split('-')[0] :
    language :
    'en';
};
