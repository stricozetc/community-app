import Validator from 'validator';
import { isEmpty } from './is-empty';
import { logicErr } from 'errors/logicErr';
import { ErrorBlock } from 'models/error';

export function validateSetLanguage(email: string, language: string): { errors: ErrorBlock[], isValid: boolean } {
  const errors: ErrorBlock[] = [];
  email = !isEmpty(email) ? email : '';
  language = !isEmpty(language) ? email : '';

  if (Validator.isEmpty(email)) {
    errors.push(logicErr.emailIsRequired);
  }

  if (!Validator.isEmail(email)) {
    errors.push(logicErr.emailMustBeValid);
  }

  if (Validator.isEmpty(language)) {
    errors.push(logicErr.languageIsRequired);
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
