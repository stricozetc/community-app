import {
  SocialNetworksUser,
  UserFieldsToLogin,
  UserFieldsToRegister,
} from 'models';

import { action } from '../decorators';

import { FrontEndUser } from './interfaces';

export enum AuthTypes {
  RegisterUser = '[auth] Register User',
  LoginUser = '[auth] Login User',
  LogoutUser = '[auth] Logout User',
  SetCurrentUser = '[auth] Set Current User',
  RegistrationSuccess = '[auth] Registration (Success)',
  RegistrationError = '[auth] Registration (Error)',
  SocialNetworksLogin = '[auth] Social Networks Login',
  LoginError = '[auth] Login (error)',
  GetUserLinks = '[auth] Get User Links',
  GetUserLinksError = '[auth] Get User Links (Error)',
  GetUserLinksSuccess = '[auth] Get User Links (Success)',
}

@action()
export class SetCurrentUser {
  public readonly type = AuthTypes.SetCurrentUser;

  constructor(public payload: FrontEndUser | undefined) { }
}

@action()
export class RegisterUser {
  public readonly type = AuthTypes.RegisterUser;

  constructor(public payload: UserFieldsToRegister) { }
}

@action()
export class LoginUser {
  public readonly type = AuthTypes.LoginUser;

  constructor(public payload: UserFieldsToLogin) { }
}

@action()
export class LogoutUser {
  public readonly type = AuthTypes.LogoutUser;
}

@action()
export class RegistrationSuccess {
  public readonly type = AuthTypes.RegistrationSuccess;

  constructor(public payload: UserFieldsToLogin) { }
}

@action()
export class RegistrationError {
  public readonly type = AuthTypes.RegistrationError;
}

@action()
export class SocialNetworksLogin {
  public readonly type = AuthTypes.SocialNetworksLogin;

  constructor(public payload: SocialNetworksUser) { }
}

@action()
export class LoginError {
  public readonly type = AuthTypes.LoginError;
}

@action()
export class GetUserLinks {
  public readonly type = AuthTypes.GetUserLinks;

  constructor(public userId: number) { }
}

@action()
export class GetUserLinksSuccess {
  public readonly type = AuthTypes.GetUserLinksSuccess;

  constructor(public userLinks: string[]) { }
}

@action()
export class GetUserLinksError {
  public readonly type = AuthTypes.GetUserLinksError;
}

export type AuthActions =
  | RegisterUser
  | LoginUser
  | LogoutUser
  | SetCurrentUser
  | RegistrationSuccess
  | RegistrationError
  | SocialNetworksLogin
  | GetUserLinks
  | GetUserLinksError
  | GetUserLinksSuccess
  | LoginError;
