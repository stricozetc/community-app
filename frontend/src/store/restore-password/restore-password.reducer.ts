import { RestorePasswordStatus } from 'models';

import { RestorePasswordActions, RestorePasswordTypes } from './restore-password.action';
import { initialState } from './restore-password.initial';

export const restorePasswordReducer = (state = initialState, action: RestorePasswordActions) => {

    switch (action.type) {
        case RestorePasswordTypes.SendRestoreRequest: {
            return {
                ...state,
                status: RestorePasswordStatus.Wait,
                userEmail: action.payload
            };
        }
        case RestorePasswordTypes.SendRestoreRequestSuccess: {
            return {
                ...state,
                status: RestorePasswordStatus.Success,
            };
        }
        case RestorePasswordTypes.SendRestoreRequestError: {
            return {
                ...state,
                status: RestorePasswordStatus.Fail,
            };
        }
        case RestorePasswordTypes.ResetRequest: {
            return {
                ...state,
                status: RestorePasswordStatus.Init,
                userEmail: ''
            };
        }
        default:
            return state;
    }

};
