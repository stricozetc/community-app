import { LoadStatus } from 'models';

import { UserSettingsState } from './interfaces';
import { UserSettingsActions, UserSettingsTypes } from './user-settings.action';
import { initialState } from './user-settings.initial';

type State = UserSettingsState;

export const userSettingsReducer = (
  state = initialState,
  action: UserSettingsActions
): State => {
  switch (action.type) {
    case UserSettingsTypes.ChangeLanguage: {
      return {
        ...state,
        language: action.payload
      };
    }
    case UserSettingsTypes.SaveLanguage: {
      return {
        ...state,
        saveLanguageStatus: LoadStatus.Fetching,
      };
    }
    case UserSettingsTypes.SaveLanguageSuccess: {
      return {
        ...state,
        saveLanguageStatus: LoadStatus.Success,
      };
    }
    case UserSettingsTypes.SaveLanguageError: {
      return {
        ...state,
        saveLanguageStatus: LoadStatus.Error,
        saveLanguageErrors: action.payload
      };
    }
    default:
      return state;
  }
};
