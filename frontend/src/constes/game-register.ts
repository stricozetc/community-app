import { FrontEndValidationErrorsGameRegister  } from 'models';

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