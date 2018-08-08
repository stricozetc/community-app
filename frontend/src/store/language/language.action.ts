import { Action } from 'redux';
import { action } from 'store/decorators';

export enum LanguageActionTypes {
  ChangeLanguage = '[language] Change Language',
  ChangeLanguageSuccess = '[language] Change Language Success',
  SaveLanguage = '[language] Save Language',
  SaveLanguageSuccess = '[language] Save Language Success',
  SaveLanguageFail = '[language] Save Language Fail'
}

@action()
export class ChangeLanguage implements Action {
  public readonly type = LanguageActionTypes.ChangeLanguage;

  constructor(public payload: string) { }
}

@action()
export class ChangeLanguageSuccess implements Action {
  public readonly type = LanguageActionTypes.ChangeLanguageSuccess;

  constructor(public payload?: string) { }
}

@action()
export class SaveLanguage implements Action {
  public readonly type = LanguageActionTypes.SaveLanguage;

  constructor(public payload: { userEmail: string, userLanguage: string }) { }
}

@action()
export class SaveLanguageSuccess implements Action {
  public readonly type = LanguageActionTypes.SaveLanguageSuccess;

  constructor(public payload?: string) { }
}

@action()
export class SaveLanguageFail implements Action {
  public readonly type = LanguageActionTypes.SaveLanguageFail;

  constructor(public payload?: string) { }
}

export type LanguageActions =
  | ChangeLanguage
  | SaveLanguage
  | SaveLanguageSuccess
  | SaveLanguageFail
  | ChangeLanguageSuccess;
