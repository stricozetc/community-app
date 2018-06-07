import { UserFieldsToLogin, UserFieldsToRegister,  } from 'interfaces/FrontEndValidation';
import { action } from 'store/decorators';
import { FrontEndUser } from './interfaces';


export enum AuthTypes {
    REGISTER_USER = '[auth] REGISTER_USER',
    LOGIN_USER = '[auth] LOGIN_USER',
    LOGOUT_USER = '[auth] LOGOUT_USER',
    SET_CURRENT_USER = '[auth] SET_CURRENT_USER',
    REDIRECT_TO_LOGIN = '[auth] REDIRECT_TO_LOGIN'
}


@action()
export class SetCurrentUser {
    public readonly type = AuthTypes.SET_CURRENT_USER;

    constructor(public payload: FrontEndUser | {}) { }
}


@action()
export class RegisterUser {
    public readonly type = AuthTypes.REGISTER_USER;

    constructor(public payload: UserFieldsToRegister) {}
}

@action()
export class LoginUser {
    public readonly type = AuthTypes.LOGIN_USER;

    constructor(public payload: UserFieldsToLogin) { }
}

@action()
export class LogoutUser {
    public readonly type = AuthTypes.LOGOUT_USER;

}

@action()
export class RedirectToLogin {
    public readonly type = AuthTypes.REDIRECT_TO_LOGIN;

}


export type AuthActions =
    | RegisterUser
    | LoginUser
    | LogoutUser
    | SetCurrentUser
    | RedirectToLogin;
