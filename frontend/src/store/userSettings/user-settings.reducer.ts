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
    case UserSettingsTypes.ChangePassword: {
      return {
        ...state,
        changePasswordStatus: LoadStatus.FETCHING
      };
    }
    case UserSettingsTypes.ChangePasswordSuccess: {
      return {
        ...state,
        changePasswordStatus: LoadStatus.SUCCESS
      };
    }
    case UserSettingsTypes.ChangePasswordError: {
      return {
        ...state,
        changePasswordErrors: action.payload,
        changePasswordStatus: LoadStatus.ERROR
      };
    }
    case UserSettingsTypes.ChangeLanguage: {
      return {
        ...state,
        language: action.payload
      };
    }
    case UserSettingsTypes.SaveLanguage: {
      return {
        ...state,
        saveLanguageStatus: LoadStatus.FETCHING,
      };
    }
    case UserSettingsTypes.SaveLanguageSuccess: {
      return {
        ...state,
        saveLanguageStatus: LoadStatus.SUCCESS,
      };
    }
    case UserSettingsTypes.SaveLanguageError: {
      return {
        ...state,
        saveLanguageStatus: LoadStatus.ERROR,
        saveLanguageErrors: action.payload
      };
    }
    default:
      return state;
  }
};
