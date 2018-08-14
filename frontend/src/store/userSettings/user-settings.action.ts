import { action } from '../decorators';

import { FieldsToChangePassword } from './interfaces';

export enum UserSettingsTypes {
  ChangePassword = '[user-settings] Change Password',
  ChangePasswordSuccess = '[user-settings] Change Password (Success)',
  ChangePasswordError = '[user-settings] Change Password (Error)'

}

@action()
export class ChangePassword {
  public readonly type = UserSettingsTypes.ChangePassword;

  constructor(public payload: FieldsToChangePassword) { }
}

@action()
export class ChangePasswordSuccess {
  public readonly type = UserSettingsTypes.ChangePasswordSuccess;
}

@action()
export class ChangePasswordError {
  public readonly type = UserSettingsTypes.ChangePasswordError;

  constructor(public payload: any) { }
}

export type UserSettingsActions =
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordError;
