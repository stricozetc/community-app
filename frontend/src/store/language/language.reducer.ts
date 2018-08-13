import { LanguageStatus } from 'models';

import { LanguageActionTypes, LanguageActions } from './language.action';
import { initialState } from './language.initial';

export const languageReducer = (state = initialState, action: LanguageActions) => {
  switch (action.type) {
    case LanguageActionTypes.ChangeLanguage: {
      return {
        ...state,
        status: LanguageStatus.CHANGING,
        language: action.payload
      };
    }
    case LanguageActionTypes.SaveLanguage: {
      return {
        ...state,
        status: LanguageStatus.SAVING,
      };
    }
    case LanguageActionTypes.SaveLanguageSuccess: {
      return {
        ...state,
        status: LanguageStatus.SAVED,
      };
    }
    case LanguageActionTypes.SaveLanguageFail: {
      return {
        ...state,
        status: LanguageStatus.FAIL,
      };
    }
    default:
      return state;
  }
};
