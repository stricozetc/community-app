import * as Validator from 'validator';
import { User } from './../../Interfaces/User';
import { isEmpty } from './is-empty';

export function validateLoginInput(data: User): {errors: any, isValid: boolean} {
    let errors: any = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';


    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is Invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }; 
}
