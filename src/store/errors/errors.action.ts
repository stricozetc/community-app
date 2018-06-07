import { action } from 'store/decorators';

export enum ErrorsTypes {
    GET_ERRORS = '[errors] GET_ERRORS'
}

@action()
export class GetErrors {
    public readonly type = ErrorsTypes.GET_ERRORS;

    constructor(public payload: any) { }
}

export type ErrorActions =
    GetErrors;
