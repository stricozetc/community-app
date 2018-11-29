import Validator from 'validator';
import { isEmpty } from './is-empty';
import { UserFieldsToRegister } from 'interfaces/UserFieldsToRegister';
import { logicErr } from 'errors/logicErr';
import { ErrorBlock } from 'models/error';

export function validateRegisterInput(data: UserFieldsToRegister): { errors: ErrorBlock[], isValid: boolean } {
    const errors: ErrorBlock[] = [];

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.language = !isEmpty(data.language) ? data.language : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.push(logicErr.nameLength);
    }

    if (Validator.isEmpty(data.name)) {
        errors.push(logicErr.nameIsRequired);
    }

    if (!Validator.isEmail(data.email)) {
        errors.push(logicErr.emailMustBeValid);
    }

    if (Validator.isEmpty(data.email)) {
        errors.push(logicErr.emailIsRequired);
    }

    if (Validator.isEmpty(data.password)) {
        errors.push(logicErr.passwordIsRequired);
    }

    if (Validator.isEmpty(data.password2)) {
        errors.push(logicErr.confirmedPasswordIsRequired);
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.push(logicErr.passwordLength);
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.push(logicErr.passwordsMustMatch);
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
