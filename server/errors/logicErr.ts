import { errCodes } from './errCodes';

export const logicErr = {
  emailIsRequired: {
    code: errCodes.emailIsRequired,
    msg: 'Email is required'
  },

  passwordIsRequired: {
    code: errCodes.passwordIsRequired,
    msg: 'Password is required'
  },

  nameIsRequired: {
    code: errCodes.nameIsRequired,
    msg: 'Name is required'
  },

  confirmedPasswordIsRequired: {
    code: errCodes.confirmedPasswordIsRequired,
    msg: 'Confirmed password is required'
  },

  urlIsRequired: {
    code: errCodes.urlIsRequired,
    msg: 'URL is required',
  },

  userIdIsRequired: {
    code: errCodes.userIdIsRequired,
    msg: 'user id is required',
  },

  userTokenIsRequired: {
    code: errCodes.userTokenIsRequired,
    msg: 'User token is required'
  },

  resultStatusIsRequired: {
    code: errCodes.resultStatusIsRequired,
    msg: 'result status token is required'
  },

  participationStatusIsRequired: {
    code: errCodes.participationStatusIsRequired,
    msg: 'Participation status is required'
  },

  languageIsRequired: {
    code: errCodes.languageIsRequired,
    msg: 'Language is required'
  },

  emailMustBeValid: {
    code: errCodes.emailMustBeValid,
    msg: 'Email is Invalid'
  },

  urlMustBeValid: {
    code: errCodes.urlMustBeValid,
    msg: 'This string is not URL',
  },

  wrongPassword: (email: string) => ({
    code: errCodes.wrongPassword,
    msg: `Password is incorrect for ${email}`
  }),

  passwordsMustMatch: {
    code: errCodes.passwordsMustMatch,
    msg: 'Passwords must match'
  },

  notFoundUser: {
    code: errCodes.notFoundUser,
    msg: 'Can not found user with this email'
  },

  notFoundUserRole: {
    code: errCodes.notFoundUserRole,
    msg: 'Can not found user role'
  },

  notFoundAppToken: {
    code: errCodes.notFoundAppToken,
    msg: 'Can not found application token'
  },

  notFoundRecentGames: {
    code: errCodes.notFoundRecentGames,
    msg: 'Can not found recent games'
  },

  notFoundEmail: {
    code: errCodes.notFoundEmail,
    msg: 'Can not found email'
  },

  userIsAlreadyRegistered: {
    code: errCodes.userIsAlreadyRegistered,
    msg: 'User is already registered'
  },

  appNameIsAlreadyRegistered: {
    code: errCodes.appNameIsAlreadyRegistered,
    msg: 'Application name is already registered'
  },

  maxRoomPlayersLessThanOne: {
    code: errCodes.maxRoomPlayersLessThanOne,
    msg: 'Max room players less than one',
  },

  scoresLessThanZero: {
    code: errCodes.scoresLessThanZero,
    msg: 'Scores less than one',
  },

  playedTimeLessThanZero: {
    code: errCodes.playedTimeLessThanZero,
    msg: 'Played time less than one',
  },

  nameLength: {
    code: errCodes.nameLength,
    msg: 'Name must be between 2 and 30 characters'
  },

  passwordLength: {
    code: errCodes.passwordLength,
    msg: 'Password must be at least 6 characters and not more that 30'
  },

  languageLength: {
    code: errCodes.languageLength,
    msg: 'Language must be at least 2 characters'
  },

  newPasswordLength: {
    code: errCodes.newPasswordLength,
    msg: 'New Password must be at least 6 characters and not more that 30'
  },

  oldPasswordLength: {
    code: errCodes.oldPasswordLength,
    msg: 'Old Password must be at least 6 characters and not more that 30'
  },

  userShouldBeActive: {
    code: errCodes.userShouldBeActive,
    msg: 'User should be Active',
  },

  oldPasswordIsRequired: {
    code: errCodes.oldPasswordIsRequired,
    msg: 'Old password is required',
  },

  newPasswordIsRequired: {
    code: errCodes.newPasswordIsRequired,
    msg: 'New password is requred',
  },

  repeatNewPasswordIsRequired: {
    code: errCodes.repeatNewPasswordIsRequired,
    msg: 'Repeat new password is requred',
  },

  newPasswordsMustMatch: {
    code: errCodes.newPasswordsMustMatch,
    msg: 'New password must match',
  },

  newAndOldPasswordsShouldBeDifferent: {
    code: errCodes.newAndOldPasswordsShouldBeDifferent,
    msg: 'New and old passwords should be different',
  },

  repeatNewPasswordLength: {
    code: errCodes.repeatNewPasswordLength,
    msg: 'Password to repeat must be at least 6 characters and not more that 30',
  },

  appNameRequired: {
    code: errCodes.appNameRequired,
    msg: 'User token is required'
  },
  applicationNameLengthError: {
    code: errCodes.applicationNameLengthError,
    msg: 'The length of application name should be in interval of 3-50 symbols',
  },

  descriptionRequired: {
    code: errCodes.descriptionRequired,
    msg: 'Application description should be required'
  },
  descriptionApplicationLengthError: {
    code: errCodes.descriptionApplicationLengthError,
    msg: 'The length of application description should be in interval of 3-50 symbols',
  },

  maxRoomPlayerRequired: {
    code: errCodes.maxRoomPlayerRequired,
    msg: 'Count of players in room should be required'
  },
  maxRoomPlayerCountError: {
    code: errCodes.maxRoomPlayerCountError,
    msg: 'Count of players in room should be more than 2',
  },

  maxRoomsRequired: {
    code: errCodes.maxRoomsRequired,
    msg: 'Count of rooms should be required'
  },
  maxRoomsCountError: {
    code: errCodes.maxRoomsCountError,
    msg: 'Count of rooms should be more than 1',
  },

  requestUrlRequired: {
    code: errCodes.requestUrlRequired,
    msg: 'RequestUrl should be required'
  },
  requestUrlError: {
    code: errCodes.requestUrlError,
    msg: 'RequestUrl should be correct',
  },

  maxWaitingTimeRequired: {
    code: errCodes.maxWaitingTimeRequired,
    msg: 'Waiting time for the battle should be required'
  },
  maxWaitingTimeError: {
    code: errCodes.maxWaitingTimeError,
    msg: 'Waiting time for the battle should be more than 15 minutes',
  },

  redirectUrlRequired: {
    code: errCodes.redirectUrlRequired,
    msg: 'RedirectUrl should be required'
  },
  redirectUrlError: {
    code: errCodes.redirectUrlError,
    msg: 'RedirectUrl should be correct'
  },

  userIdRequired: {
    code: errCodes.userIdRequired,
    msg: 'UserId should be required'
  }
};
