import Validator from 'validator';
import { User } from 'interfaces/User';
import { isEmpty } from './is-empty';
import { logicErr } from 'errors/logicErr';
import { ErrorBlock } from 'models/error';

export function validateLoginInput(data: User): { errors: ErrorBlock[], isValid: boolean } {
    const errors: ErrorBlock[] = [];

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.push(logicErr.emailMustBeValid);
    }

    if (Validator.isEmpty(data.email)) {
        errors.push(logicErr.emailIsRequired);
    }

    if (Validator.isEmpty(data.password)) {
        errors.push(logicErr.passwordIsRequired);
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
