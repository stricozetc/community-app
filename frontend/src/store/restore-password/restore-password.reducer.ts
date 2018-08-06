import { RestorePasswordStatus } from 'models';

import { RestorePasswordActions, RestorePasswordTypes } from './restore-password.action';
import { initialState } from './restore-password.initial';

export const restorePasswordReducer = (state = initialState, action: RestorePasswordActions) => {

    switch (action.type) {
        case RestorePasswordTypes.SendRestoreRequest: {
            return {
                ...state,
                status: RestorePasswordStatus.WAIT,
                userEmail: action.payload
            };
        }
        case RestorePasswordTypes.SendRestoreRequestSuccess: {
            return {
                ...state,
                status: RestorePasswordStatus.SUCCESS,
            };
        }
        case RestorePasswordTypes.SendRestoreRequestFail: {
            return {
                ...state,
                status: RestorePasswordStatus.FAIL,
            };
        }
        default:
            return state;
    }

};
