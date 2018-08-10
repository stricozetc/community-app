import { LoadStatus } from 'models';

import { UserSettingsActions, UserSettingsTypes } from './user-settings.action';
import { initialState } from './user-settings.initial';

export const userSettingsReducer = (
  state = initialState,
  action: UserSettingsActions
) => {
  switch (action.type) {
    case UserSettingsTypes.ChangePassword: {
      return {
        ...state,
        changePasswordStatus: LoadStatus.Fetching
      };
    }
    case UserSettingsTypes.ChangePasswordCompleted: {
      return {
        ...state,
        changePasswordStatus: LoadStatus.Success
      };
    }
    case UserSettingsTypes.ChangePasswordFailed: {
      return {
        changePasswordErrors: action.payload,
        changePasswordStatus: LoadStatus.Error
      };
    }
    default:
      return state;
  }
};
