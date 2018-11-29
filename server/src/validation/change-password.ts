import Validator from 'validator';
import { isEmpty } from './is-empty';
import { ErrorBlock, FieldsToChangePassword } from 'models';
import { logicErr } from 'errors/logicErr';

export function validateChangePassword(
  data: FieldsToChangePassword
): { errors: ErrorBlock[]; isValid: boolean } {
  data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : '';
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
  data.repeatNewPassword = !isEmpty(data.repeatNewPassword)
    ? data.repeatNewPassword
    : '';
  data.userId = !isEmpty(data.userId) ? data.userId : 0;

  let errors: ErrorBlock[] = [];

  if (Validator.isEmpty(data.oldPassword)) {
    errors = addError(errors, logicErr.oldPasswordIsRequired);
  }

  if (Validator.isEmpty(data.newPassword)) {
    errors = addError(errors, logicErr.newPasswordIsRequired);
  }

  if (Validator.isEmpty(data.repeatNewPassword)) {
    errors = addError(errors, logicErr.repeatNewPasswordIsRequired);
  }

  if (!Validator.equals(data.newPassword, data.repeatNewPassword)) {
    errors = addError(errors, logicErr.newPasswordsMustMatch);
  }

  if (Validator.equals(data.newPassword, data.oldPassword)) {
    errors = addError(errors, logicErr.newAndOldPasswordsShouldBeDifferent);
  }

  if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors = addError(errors, logicErr.newPasswordLength);
  }

  if (!Validator.isLength(data.oldPassword, { min: 6, max: 30 })) {
    errors = addError(errors, logicErr.oldPasswordLength);
  }

  if (!Validator.isLength(data.repeatNewPassword, { min: 6, max: 30 })) {
    errors = addError(errors, logicErr.repeatNewPasswordLength);
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

const addError = (errors: ErrorBlock[], errToAdd: ErrorBlock) => {
  return errors.concat(errToAdd);
};
