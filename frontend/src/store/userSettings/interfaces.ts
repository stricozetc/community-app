
import { LoadStatus } from 'models';

import { Errors } from '../../models';

export interface UserSettingsState {
  changePasswordStatus: LoadStatus;
  changePasswordErrors: Errors | undefined;
}

export interface FieldsToChangePassword {
  userId: number | undefined; 
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}