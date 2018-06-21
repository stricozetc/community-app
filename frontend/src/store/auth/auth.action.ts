import { UserFieldsToLogin, UserFieldsToRegister } from 'models';

import { action } from '../decorators';
import { FrontEndUser } from './interfaces';

export enum AuthTypes {
    RegisterUser = '[auth] Register User',
    LoginUser = '[auth] Login User',
    LogoutUser = '[auth] Logout User',
    SetCurrentUser = '[auth] Set Current User'
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

export type AuthActions =
    | RegisterUser
    | LoginUser
    | LogoutUser
    | SetCurrentUser;
