import { FrontEndValidationErrorsChangePassword } from 'models';

export const frontEndValidationErrorsChangePassword: FrontEndValidationErrorsChangePassword = {
  oldPassword: {
    min: 'passwordError',
    required: 'passwordRequired'
  },
  newPassword: {
      min: 'passwordError',
      required: 'passwordRequired'
  },
  repeatNewPassword: {
      min: 'passwordError',
      required: 'passwordRequired',
      mustMatch: 'matchNewPassword'
  }
};
