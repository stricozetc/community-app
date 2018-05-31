export interface FrontEndValidationErrorsRegister {
    email: {mustBeCorrect: string,  required: string},
    password: {min: string, required: string},
    name: {min: string, required: string},
}

export interface FrontEndValidationErrorsLogin {
    email: {mustBeCorrect: string,  required: string},
    password: {min: string, required: string},
}

export interface UserFieldsToRegister {
    email: string,
    name: string,
    password: string,
    password2: string
}

export interface UserFieldsToLogin {
    email: string,
    password: string,
}

