import { LogicErrCodes } from './errCodes';

export const logicErr = {
  emailIsRequired: {
    code: LogicErrCodes.EmailIsRequired,
    msg: 'Email is required'
  },

  passwordIsRequired: {
    code: LogicErrCodes.PasswordIsRequired,
    msg: 'Password is required'
  },

  nameIsRequired: {
    code: LogicErrCodes.NameIsRequired,
    msg: 'Name is required'
  },

  confirmedPasswordIsRequired: {
    code: LogicErrCodes.ConfirmedPasswordIsRequired,
    msg: 'Confirmed password is required'
  },

  urlIsRequired: {
    code: LogicErrCodes.UrlIsRequired,
    msg: 'URL is required',
  },

  userIdIsRequired: {
    code: LogicErrCodes.UserIdIsRequired,
    msg: 'user id is required',
  },

  userTokenIsRequired: {
    code: LogicErrCodes.UserTokenIsRequired,
    msg: 'User token is required'
  },

  resultStatusIsRequired: {
    code: LogicErrCodes.ResultStatusIsRequired,
    msg: 'result status token is required'
  },

  participationStatusIsRequired: {
    code: LogicErrCodes.ParticipationStatusIsRequired,
    msg: 'Participation status is required'
  },

  languageIsRequired: {
    code: LogicErrCodes.LanguageIsRequired,
    msg: 'Language is required'
  },

  emailMustBeValid: {
    code: LogicErrCodes.EmailMustBeValid,
    msg: 'Email is Invalid'
  },

  urlMustBeValid: {
    code: LogicErrCodes.UrlMustBeValid,
    msg: 'This string is not URL',
  },

  wrongPassword: (email: string) => ({
    code: LogicErrCodes.WrongPassword,
    msg: `Password is incorrect for ${email}`
  }),

  passwordsMustMatch: {
    code: LogicErrCodes.PasswordsMustMatch,
    msg: 'Passwords must match'
  },

  notFoundUser: {
    code: LogicErrCodes.NotFoundUser,
    msg: 'Can not found user with this email'
  },

  notFoundUserRole: {
    code: LogicErrCodes.NotFoundUserRole,
    msg: 'Can not found user role'
  },

  notFoundAppToken: {
    code: LogicErrCodes.NotFoundAppToken,
    msg: 'Can not found application token'
  },

  notFoundRecentGames: {
    code: LogicErrCodes.NotFoundRecentGames,
    msg: 'Can not found recent games'
  },

  notFoundEmail: {
    code: LogicErrCodes.NotFoundEmail,
    msg: 'Can not found email'
  },

  userIsAlreadyRegistered: {
    code: LogicErrCodes.UserIsAlreadyRegistered,
    msg: 'User is already registered'
  },

  appNameIsAlreadyRegistered: {
    code: LogicErrCodes.AppNameIsAlreadyRegistered,
    msg: 'Application name is already registered'
  },

  maxRoomPlayersLessThanOne: {
    code: LogicErrCodes.MaxRoomPlayersLessThanOne,
    msg: 'Max room players less than one',
  },

  scoresLessThanZero: {
    code: LogicErrCodes.ScoresLessThanZero,
    msg: 'Scores less than one',
  },

  playedTimeLessThanZero: {
    code: LogicErrCodes.PlayedTimeLessThanZero,
    msg: 'Played time less than one',
  },

  nameLength: {
    code: LogicErrCodes.NameLength,
    msg: 'Name must be between 2 and 30 characters'
  },

  passwordLength: {
    code: LogicErrCodes.PasswordLength,
    msg: 'Password must be at least 6 characters and not more that 30'
  },

  languageLength: {
    code: LogicErrCodes.LanguageLength,
    msg: 'Language must be at least 2 characters'
  },

  newPasswordLength: {
    code: LogicErrCodes.NewPasswordLength,
    msg: 'New Password must be at least 6 characters and not more that 30'
  },

  oldPasswordLength: {
    code: LogicErrCodes.OldPasswordLength,
    msg: 'Old Password must be at least 6 characters and not more that 30'
  },

  userShouldBeActive: {
    code: LogicErrCodes.UserShouldBeActive,
    msg: 'User should be Active',
  },

  oldPasswordIsRequired: {
    code: LogicErrCodes.OldPasswordIsRequired,
    msg: 'Old password is required',
  },

  newPasswordIsRequired: {
    code: LogicErrCodes.NewPasswordIsRequired,
    msg: 'New password is requred',
  },

  repeatNewPasswordIsRequired: {
    code: LogicErrCodes.RepeatNewPasswordIsRequired,
    msg: 'Repeat new password is requred',
  },

  newPasswordsMustMatch: {
    code: LogicErrCodes.NewPasswordsMustMatch,
    msg: 'New password must match',
  },

  newAndOldPasswordsShouldBeDifferent: {
    code: LogicErrCodes.NewAndOldPasswordsShouldBeDifferent,
    msg: 'New and old passwords should be different',
  },

  repeatNewPasswordLength: {
    code: LogicErrCodes.RepeatNewPasswordLength,
    msg: 'Password to repeat must be at least 6 characters and not more that 30',
  },

  appNameRequired: {
    code: LogicErrCodes.AppNameRequired,
    msg: 'User token is required'
  },
  applicationNameLengthError: {
    code: LogicErrCodes.ApplicationNameLengthError,
    msg: 'The length of application name should be in interval of 3-50 symbols',
  },

  descriptionRequired: {
    code: LogicErrCodes.DescriptionRequired,
    msg: 'Application description should be required'
  },
  descriptionApplicationLengthError: {
    code: LogicErrCodes.DescriptionApplicationLengthError,
    msg: 'The length of application description should be in interval of 10-150 symbols',
  },

  maxRoomPlayerRequired: {
    code: LogicErrCodes.MaxRoomPlayerRequired,
    msg: 'Count of players in room should be required'
  },
  maxRoomPlayerCountError: {
    code: LogicErrCodes.MaxRoomPlayerCountError,
    msg: 'Count of players in room should be more than 2',
  },

  maxRoomsRequired: {
    code: LogicErrCodes.MaxRoomsRequired,
    msg: 'Count of rooms should be required'
  },
  maxRoomsCountError: {
    code: LogicErrCodes.MaxRoomsCountError,
    msg: 'Count of rooms should be more than 1',
  },

  requestUrlRequired: {
    code: LogicErrCodes.RequestUrlRequired,
    msg: 'RequestUrl should be required'
  },
  requestUrlError: {
    code: LogicErrCodes.RequestUrlError,
    msg: 'RequestUrl should be correct',
  },

  maxWaitingTimeRequired: {
    code: LogicErrCodes.MaxWaitingTimeRequired,
    msg: 'Waiting time for the battle should be required'
  },
  maxWaitingTimeError: {
    code: LogicErrCodes.MaxWaitingTimeError,
    msg: 'Waiting time for the battle should be more than 15 minutes',
  },

  redirectUrlRequired: {
    code: LogicErrCodes.RedirectUrlRequired,
    msg: 'RedirectUrl should be required'
  },
  redirectUrlError: {
    code: LogicErrCodes.RedirectUrlError,
    msg: 'RedirectUrl should be correct'
  },

  userIdRequired: {
    code: LogicErrCodes.UserIdRequired,
    msg: 'UserId should be required'
  }
};
