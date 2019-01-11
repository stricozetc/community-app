import { AuthStatus } from 'models';
import { isEmpty } from 'utils';

import { AuthActions, AuthTypes } from './auth.action';
import { initialState } from './auth.initial';

export const authReducer = (state = initialState, action: AuthActions) => {

    switch (action.type) {
        case AuthTypes.SetCurrentUser: {
            return {
                ...state,
                status: !isEmpty(action.payload) ? AuthStatus.Authorized : AuthStatus.NotAuthorized,
                user: action.payload,
                spinnerRun: false
            };
        }
        case AuthTypes.RegisterUser: {
            return {
                ...state,
                spinnerRun: true
            };
        }
        case AuthTypes.LoginUser: {
            return {
                ...state,
                spinnerRun: true
            };
        }
        case AuthTypes.RegistrationError: {
            return {
                ...state,
                spinnerRun: false
            };
        }
        case AuthTypes.RegistrationSuccess: {
            return {
                ...state,
                spinnerRun: false
            };
        }
        case AuthTypes.LoginError: {
            return {
                ...state,
                spinnerRun: false
            };
        }
        case AuthTypes.GetUserLinks: {
            return {
                ...state,
                spinnerRun: true
            };
        }
        case AuthTypes.GetUserLinksError: {
            return {
                ...state,
                spinnerRun: false
            };
        }
        case AuthTypes.GetUserLinksSuccess: {
            return {
                ...state,
                appMenuLinks: action.userLinks
            };
        }
        default:
            return state;
    }

};
