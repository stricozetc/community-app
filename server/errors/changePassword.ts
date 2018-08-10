import { errCodes, technicalErrCodes } from './errCodes';

export const changePasswordErrors = {
  oldPasswordIsRequired: {
    code: errCodes.smtRequired,
    msg: 'Old password is required'
  },
  newPasswordIsRequired: {
    code: errCodes.smtRequired,
    msg: 'new password is required'
  },

  repeatNewPasswordIsRequired: {
    code: errCodes.smtRequired,
    msg: 'Repeat new password is required'
  },

  newPasswordsMustMatch: {
    code: errCodes.smtIsNotEqual,
    msg: 'New passwords must match'
  },

  newAndOldPasswordsShouldBeDifferent: {
    code: errCodes.smtIsEqual,
    msg: 'New and old password should be different'
  },

  oldPasswordShouldBeReal: {
    code: errCodes.smtIsNotEqual,
    msg: 'Password is invalid'
  },

  notFoundUser: {
    code: technicalErrCodes.smtIsNotFoundedInDb,
    msg: 'You are not registered'
  },

  passwordLength: {
    code: errCodes.smtIsOutOfRange,
    msg: 'Password must be at least 6 characters and not more that 30'
  }
};
