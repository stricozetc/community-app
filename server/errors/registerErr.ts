import { errCodes } from "./errCodes";

export const registerErr = {
  nameLength: {
    code: errCodes.smtIsOutOfRange,
    msg: 'Name must be between 2 and 30 characters'
  },
  passwordLength: {
    code: errCodes.smtIsOutOfRange,
    msg: 'Password must be at least 6 characters and not more that 30'
  },
  passwordsMustMatch: {
    code: errCodes.smtIsNotEqual,
    msg: 'Passwords must match'
  },
  emailMustBeValid: {
    code: errCodes.smtInvalid,
    msg: 'Email is Invalid'
  },
  nameIsRequired: {
    code: errCodes.smtRequired,
    msg: 'Name is required'
  },
  emailIsRequired: {
    code: errCodes.smtRequired,
    msg: 'Email is required'
  },
  passwordIsRequired: {
    code: errCodes.smtRequired,
    msg: 'password is required'
  },
  confirmedPasswordIsRequired: {
    code: errCodes.smtRequired,
    msg: 'Confirmed password is required'
  },

  userIsAlreadyRegistered: {
    code: errCodes.smtExist,
    msg: 'User is already registered'
  },
};
