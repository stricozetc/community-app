import { FrontEndValidationErrorsGameRegister  } from 'models';

// tslint:disable-next-line:max-line-length
export const urlRegExp: RegExp = /^(https?):\/\/((?:[a-z0-9.-]|%[0-9A-F]{2}){3,})(?::(\d+))?((?:\/(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})*)*)(?:\?((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?(?:#((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?$/i;

export const frontEndValidationGameRegister: FrontEndValidationErrorsGameRegister = {
    appName: {
        length: 'applicationNameLengthError',
        required: 'appNameRequired'
    },
    description: {
        length: 'descriptionApplicationLengthError',
        required: 'descriptionRequired'
    },
    maxRoomPlayer: {
        count: 'maxRoomPlayerCountError',
        required: 'maxRoomPlayerRequired'
    },
    maxRooms: {
        count: 'maxRoomsCountError',
        required: 'maxRoomsRequired'
    },
    requestUrl: {
        mustBeCorrect: 'requestUrlError',
        required: 'requestUrlRequired'
    },
    maxWaitingTime: {
        mustBeCorrect: 'maxWaitingTimeError',
        required: 'maxWaitingTimeRequired'
    },
    redirectUrl: {
        mustBeCorrect: 'redirectUrlError',
        required: 'redirectUrlRequired'
    }
};
