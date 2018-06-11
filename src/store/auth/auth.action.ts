import { UserFieldsToLogin, UserFieldsToRegister,  } from 'interfaces/FrontEndValidation';
import { action } from 'store/decorators';
import { FrontEndUser } from './interfaces';


export enum AuthTypes {
    JoinBattle = '[battle] Join Battle',
    RegisterUser = '[auth] Register User',
    LoginUser = '[auth] Login User',
    LogoutUser = '[auth] Logout User',
    SetCurrentUser = '[auth] Set Current User',
    RedirectToLogin = '[auth] Redirect To Login'
}


@action()
export class SetCurrentUser {
    public readonly type = AuthTypes.SetCurrentUser;

    constructor(public payload: FrontEndUser | undefined) { }
}


@action()
export class RegisterUser {
    public readonly type = AuthTypes.RegisterUser;

    constructor(public payload: UserFieldsToRegister) {}
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
export class RedirectToLogin {
    public readonly type = AuthTypes.RedirectToLogin;

}


export type AuthActions =
    | RegisterUser
    | LoginUser
    | LogoutUser
    | SetCurrentUser
    | RedirectToLogin;
