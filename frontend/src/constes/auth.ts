import { FrontEndValidationErrorsLogin, FrontEndValidationErrorsRegister } from 'models';

// tslint:disable-next-line:max-line-length
export const emailRegExp: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const frontEndValidationErrorsLogin: FrontEndValidationErrorsLogin = {
    email: {
        mustBeCorrect: 'Email should be correct',
        required: 'Email Should be required'
    },
    password: {
        min: 'Password should have at least 6 characters',
        required: 'Password is required'
    }
};

export const frontEndValidationErrorsRegister: FrontEndValidationErrorsRegister = {
    email: {
        mustBeCorrect: 'Email should be correct',
        required: 'Email Should be required'
    },
    password: {
        min: 'Password should have at least 6 characters',
        required: 'Password is required'
    },
    name: {
        min: 'Name should be at least 2 characters long',
        required: 'name is required'
    }
};
