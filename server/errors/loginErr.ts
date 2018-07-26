import { errCodes, technicalErrCodes } from './errCodes';

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
  notFoundUser: {
    code: technicalErrCodes.smtIsNotFoundedInDb,
    msg: 'Can not found user with this email'
  },
  wrongPassword: (email: string) => ({
    code: errCodes.smtIsNotEqual,
    msg: `Password is incorrent for ${email}`
  })
};
