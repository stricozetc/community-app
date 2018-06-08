import { action } from 'store/decorators';

export enum ErrorsTypes {
    GetErrors = '[errors] Get Errors'
}

@action()
export class GetErrors {
    public readonly type = ErrorsTypes.GetErrors;

    constructor(public payload: any) { }
}

export type ErrorActions =
    GetErrors;
