import * as Validator from 'validator';
import { isEmpty } from './is-empty';
import { UserFieldsToRegister } from './../../Interfaces/UserFieldsToRegister';
import { registerErr } from './../../errors/registerErr';

export function validateRegisterInput(data: UserFieldsToRegister): {errors: any, isValid: boolean} {
    const errors: any = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.name, {min: 2, max: 30})) {
        errors.name = registerErr.nameLength;
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = registerErr.nameIsRequired;
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = registerErr.emailMustBeValid;
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = registerErr.emailIsRequired;
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = registerErr.passwordIsRequired;
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = registerErr.confirmedPasswordIsRequired;
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = registerErr.passwordLength;
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = registerErr.passwordsMustMatch;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
