
import { isEmpty } from 'utils/isEmpty';
import { AuthActions, AuthTypes } from './auth.action';
import { initialState } from './auth.initial';

import { history } from './../../utils/history';


export const authReducer = (state = initialState, action: AuthActions) => {
    switch (action.type) {
        case AuthTypes.SetCurrentUser: {
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        }
        case AuthTypes.RedirectToLogin: {
            history.push('/login');
            
            return {
                ...state
            }
        }
        default:
            return state;
    }
}
