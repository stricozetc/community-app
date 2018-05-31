import * as Validator from 'validator';
import { IUser } from './../../Interfaces/IUser';
import { isEmpty } from './is-empty';

export function validateLoginInput(data: IUser): {errors: any, isValid: boolean} {
    let errors: any = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';


    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is Invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }; 
}
