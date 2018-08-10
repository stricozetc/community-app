import { AuthStatus, LoadStatus } from 'models';
import { FieldsToChangePassword } from '../../store/userSettings/interfaces';

import { FrontEndUser } from 'store/auth';

export interface UserSettingsProps {
  status: AuthStatus;
  user: FrontEndUser | undefined;
  changePasswordStatus: LoadStatus;
  history: any;
  changePassword(data: FieldsToChangePassword): void;
}

export interface UserSettingsState {
  isChangePasswordFormOpen: boolean;
  value: number;
}

export const initState = {
  isChangePasswordFormOpen: false,
  value: 0,
};
