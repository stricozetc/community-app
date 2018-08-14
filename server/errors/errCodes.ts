
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

  emailMustBeValid = 1009,
  urlMustBeValid = 1010,

  wrongPassword = 1011,
  passwordsMustMatch = 1012,

  notFoundUser = 1013,
  notFoundUserRole = 1014,
  notFoundAppToken = 1015,
  notFoundRecentGames = 1016,

  userIsAlreadyRegistered = 1017,
  appNameIsAlreadyRegistered = 1018,

  maxRoomPlayersLessThanOne = 1019,
  playedTimeLessThanZero = 1020,
  scoresLessThanZero = 1021,

  nameLength = 1022,
  passwordLength = 1023,

  userShouldBeActive = 1024,

  newPasswordIsRequired = 1025,
  oldPasswordIsRequired = 1026,
  repeatNewPasswordIsRequired = 1027,

  newPasswordsMustMatch = 1028,
  newAndOldPasswordsShouldBeDifferent = 1029,
  newPasswordLength = 1030,
  oldPasswordLength = 1031,
  repeatNewPasswordLength = 1032
}

export enum technicalErrCodes {
  databaseCrash = 2000,
  saltIsNotGenerated = 2001,
  canNotBcryptString = 2002,
  canNotCreateHash = 2003,

  userRoleIsNotUpsertedInDb = 2004,
  applicationTokenIsNotUpsertedInDb = 2005,
  userRoleIsNotSaveInDb = 2006,
}
