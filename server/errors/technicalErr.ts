import { technicalErrCodes } from "./errCodes";

export const technicalErr = {
  saltIsNotGenerated: (err: any) => {
    return {
      code: technicalErrCodes.saltIsNotGenerated,
      msg: 'Salt was not generated',
      err
    };
  },

  canNotBcryptString: (err: any) => {
    return {
      code: technicalErrCodes.canNotBcryptString,
      msg: 'String was not bcrypted',
      err
    };
  },

  userIsNotFound: (err: any) => {
    return {
      code: technicalErrCodes.smtIsNotFoundedInDb,
      msg: 'User can not be found in Db',
      err
    };
  },

  userRoleIsNotFound: (err: any) => {
    return {
      code: technicalErrCodes.smtIsNotFoundedInDb,
      msg: 'User Role can not be found in Db',
      err
    };
  }
};
