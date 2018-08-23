import { History } from 'history';

import { AuthStatus, LoadStatus } from 'models';
import { FieldsToChangePassword, FrontEndUser } from 'store';

export interface UserSettingsProps {
  status: AuthStatus;
  user: FrontEndUser | undefined;
  changePasswordStatus: LoadStatus;
  history: History;
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
