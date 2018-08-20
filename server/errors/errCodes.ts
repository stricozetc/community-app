
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
  notFoundEmail = 1018,

  userIsAlreadyRegistered = 1019,
  appNameIsAlreadyRegistered = 1020,

  maxRoomPlayersLessThanOne = 1021,
  playedTimeLessThanZero = 1022,
  scoresLessThanZero = 1023,

  nameLength = 1024,
  passwordLength = 1025,
  languageLength = 1026,

  userShouldBeActive = 1027,

  newPasswordIsRequired = 1027,
  oldPasswordIsRequired = 1028,
  repeatNewPasswordIsRequired = 1029,

  newPasswordsMustMatch = 1030,
  newAndOldPasswordsShouldBeDifferent = 1031,
  newPasswordLength = 1031,
  oldPasswordLength = 1032,
  repeatNewPasswordLength = 1033,

  appNameRequired = 1034,
  applicationNameLengthError = 1035,
  descriptionRequired = 1036,
  descriptionApplicationLengthError = 1037,
  maxRoomPlayerRequired = 1038,
  maxRoomPlayerCountError = 1039,
  maxRoomsRequired = 1040,
  maxRoomsCountError = 1041,
  requestUrlRequired = 1042,
  requestUrlError = 1043,
  maxWaitingTimeRequired = 1044,
  maxWaitingTimeError = 1045,
  redirectUrlRequired = 1046,
  redirectUrlError = 1047,
  userIdRequired = 1048,
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
