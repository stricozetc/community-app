import { action } from '../decorators';

import { FieldsToChangePassword } from './interfaces';

export enum UserSettingsTypes {
  ChangePassword = '[user-settings] Change Password',
  ChangePasswordSuccess = '[user-settings] Change Password (Success)',
  ChangePasswordFailed = '[user-settings] Change Password (Error)'

}

@action()
export class ChangePassword {
  public readonly type = UserSettingsTypes.ChangePassword;

  constructor(public payload: FieldsToChangePassword) { }
}

@action()
export class ChangePasswordCompleted {
  public readonly type = UserSettingsTypes.ChangePasswordSuccess;

  constructor() { }
}

@action()
export class ChangePasswordFailed {
  public readonly type = UserSettingsTypes.ChangePasswordFailed;

  constructor(public payload: any) { }
}

export type UserSettingsActions =
  | ChangePassword
  | ChangePasswordCompleted
  | ChangePasswordFailed;
