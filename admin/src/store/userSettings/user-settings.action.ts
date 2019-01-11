import { action } from '../decorators';

import { Errors } from 'models';

export enum UserSettingsTypes {
  SetLanguage = '[user-settings] Set Language',
  ChangeLanguage = '[user-settings] Change Language',
  SaveLanguage = '[user-settings] Save Language',
  SaveLanguageSuccess = '[user-settings] Save Language (Success)',
  SaveLanguageError = '[user-settings] Save Language (Error)'
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
  | SetLanguage
  | ChangeLanguage
  | SaveLanguage
  | SaveLanguageSuccess
  | SaveLanguageError;
