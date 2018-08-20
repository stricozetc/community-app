
export enum errCodes {
  emailIsRequired = 1000,
  nameIsRequired = 1001,
  confirmedPasswordIsRequired = 1002,
  passwordIsRequired = 1003,
  urlIsRequired = 1004,
  userIdIsRequired = 1005,
  userTokenIsRequired = 1006,
  resultStatusIsRequired = 1007,
  participationStatusIsRequired = 1008,
  languageIsRequired = 1009,

  emailMustBeValid = 1010,
  urlMustBeValid = 1011,

  wrongPassword = 1012,
  passwordsMustMatch = 1013,

  notFoundUser = 1014,
  notFoundUserRole = 1015,
  notFoundAppToken = 1016,
  notFoundRecentGames = 1017,
  notFoundEmail = 1017,

  userIsAlreadyRegistered = 1018,
  appNameIsAlreadyRegistered = 1019,

  maxRoomPlayersLessThanOne = 1020,
  playedTimeLessThanZero = 1021,
  scoresLessThanZero = 1022,

  nameLength = 1023,
  passwordLength = 1024,
  languageLength = 1025,

  userShouldBeActive = 1026,

  newPasswordIsRequired = 1025,
  oldPasswordIsRequired = 1026,
  repeatNewPasswordIsRequired = 1027,

  newPasswordsMustMatch = 1028,
  newAndOldPasswordsShouldBeDifferent = 1029,
  newPasswordLength = 1030,
  oldPasswordLength = 1031,
  repeatNewPasswordLength = 1032,

  appNameRequired = 1033,
  applicationNameLengthError = 1034,
  descriptionRequired = 1035,
  descriptionApplicationLengthError = 1036,
  maxRoomPlayerRequired = 1037,
  maxRoomPlayerCountError = 1038,
  maxRoomsRequired = 1039,
  maxRoomsCountError = 1040,
  requestUrlRequired = 1041,
  requestUrlError = 1042,
  maxWaitingTimeRequired = 1043,
  maxWaitingTimeError = 1044,
  redirectUrlRequired = 1045,
  redirectUrlError = 1046,
  userIdRequired = 1047
}

export enum technicalErrCodes {
  databaseCrash = 2000,
  saltIsNotGenerated = 2001,
  canNotBcryptString = 2002,
  canNotCreateHash = 2003,

  userRoleIsNotUpsertedInDb = 2004,
  applicationTokenIsNotUpsertedInDb = 2005,
  userRoleIsNotSaveInDb = 2006,
  userLanguageIsNotUpdatedInDb = 2007,

  mailNotSend = 2008,
}
