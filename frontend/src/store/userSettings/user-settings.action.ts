import { action } from '../decorators';

import { FieldsToChangePassword } from './interfaces';
import { Errors } from 'models';

export enum UserSettingsTypes {
  ChangePassword = '[user-settings] Change Password',
  ChangePasswordSuccess = '[user-settings] Change Password (Success)',
  ChangePasswordError = '[user-settings] Change Password (Error)',
  SetLanguage = '[user-settings] Set Language',
  ChangeLanguage = '[user-settings] Change Language',
  SaveLanguage = '[user-settings] Save Language',
  SaveLanguageSuccess = '[user-settings] Save Language (Success)',
  SaveLanguageError = '[user-settings] Save Language (Error)'
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

  constructor(public payload: Errors[]) { }
}

@action()
export class SetLanguage {
  public readonly type = UserSettingsTypes.SetLanguage;

  constructor(public payload: string) { }
}

@action()
export class ChangeLanguage {
  public readonly type = UserSettingsTypes.ChangeLanguage;

  constructor(public payload: string) { }
}

@action()
export class SaveLanguage {
  public readonly type = UserSettingsTypes.SaveLanguage;

  constructor(public payload: { userEmail: string, userLanguage: string }) { }
}

@action()
export class SaveLanguageSuccess {
  public readonly type = UserSettingsTypes.SaveLanguageSuccess;

  constructor(public payload?: string) { }
}

@action()
export class SaveLanguageError {
  public readonly type = UserSettingsTypes.SaveLanguageError;

  constructor(public payload: Errors[]) { }
}

export type UserSettingsActions =
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordError
  | SetLanguage
  | ChangeLanguage
  | SaveLanguage
  | SaveLanguageSuccess
  | SaveLanguageError;
