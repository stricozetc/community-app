import { FrontEndValidationErrorsLogin, FrontEndValidationErrorsRegister, FrontEndValidationErrorsVk } from 'models';

// tslint:disable-next-line:max-line-length
export const emailRegExp: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const frontEndValidationErrorsLogin: FrontEndValidationErrorsLogin = {
    email: {
        mustBeCorrect: 'emailError',
        required: 'emailRequired'
    },
    password: {
        min: 'passwordError',
        required: 'passwordRequired'
    }
};

export const frontEndValidationErrorsVk: FrontEndValidationErrorsVk = {
    email: {
        mustBeCorrect: 'emailError',
        required: 'emailRequired'
    }
};

export const frontEndValidationErrorsRegister: FrontEndValidationErrorsRegister = {
    email: {
        mustBeCorrect: 'emailError',
        required: 'emailRequired'
    },
    password: {
        min: 'passwordError',
        required: 'passwordRequired'
    },
    name: {
        min: 'nameError',
        required: 'nameRequired'
    },
    passwordToRepeat: {
        required: 'nameRequired',
        match: 'matchPassword'
    }
};
