import { Action } from 'redux';
import { action } from 'store/decorators';

export enum LanguageActionTypes {
  SetLanguage = '[language] Set Language',
  ChangeLanguage = '[language] Change Language',
  SaveLanguage = '[language] Save Language',
  SaveLanguageSuccess = '[language] Save Language Success',
  SaveLanguageFail = '[language] Save Language Fail'
}

@action()
export class SetLanguage implements Action {
  public readonly type = LanguageActionTypes.SetLanguage;

  constructor(public payload: string) { }
}

@action()
export class ChangeLanguage implements Action {
  public readonly type = LanguageActionTypes.ChangeLanguage;

  constructor(public payload: string) { }
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
  | SetLanguage
  | ChangeLanguage
  | SaveLanguage
  | SaveLanguageSuccess
  | SaveLanguageFail;
