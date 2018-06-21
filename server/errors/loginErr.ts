import { errCodes } from "./errCodes";

export const loginErr = {
  emailIsRequired: {
    code: errCodes.smtRequired,
    msg: 'Email is required'
  },
  emailMustBeValid: {
    code: errCodes.smtInvalid,
    msg: 'Email is Invalid'
  },
  passwordIsRequired: {
    code: errCodes.smtRequired,
    msg: 'Password is required'
  },
};

