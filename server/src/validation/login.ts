import * as Validator from 'validator';
import { User } from './../../Interfaces/User';
import { isEmpty } from './is-empty';
import { loginErr } from './../../errors/loginErr';

export function validateLoginInput(data: User): {errors: any, isValid: boolean} {
    const errors: any = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = loginErr.emailMustBeValid;
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = loginErr.emailIsRequired;
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = loginErr.passwordIsRequired;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
