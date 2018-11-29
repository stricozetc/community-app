import Validator from 'validator';
import { isEmpty } from './is-empty';
import { logicErr } from 'errors/logicErr';
import { ErrorBlock } from 'models/error';

export function validateEmail(email: string): { errors: ErrorBlock[], isValid: boolean } {
  const errors: ErrorBlock[] = [];
  email = !isEmpty(email) ? email : '';
  if (Validator.isEmpty(email)) {
    errors.push(logicErr.emailIsRequired);
  }

  if (!Validator.isEmail(email)) {
    errors.push(logicErr.emailMustBeValid);
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
