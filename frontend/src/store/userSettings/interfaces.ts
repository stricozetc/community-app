import { LoadStatus } from 'models';

import { Errors } from '../../models';

export interface UserSettingsState {
  changePasswordStatus: LoadStatus;
  changePasswordErrors: Errors[] | undefined;
  saveLanguageStatus: LoadStatus;
  saveLanguageErrors: Errors[] | undefined;
  language: string;
}

export interface FieldsToChangePassword {
  userId: number | undefined;
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}
