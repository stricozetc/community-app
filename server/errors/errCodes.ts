
export enum LogicErrCodes {
  EmailIsRequired = 1000,
  NameIsRequired = 1001,
  ConfirmedPasswordIsRequired = 1002,
  PasswordIsRequired = 1003,
  UrlIsRequired = 1004,
  UserIdIsRequired = 1005,
  UserTokenIsRequired = 1006,
  ResultStatusIsRequired = 1007,
  ParticipationStatusIsRequired = 1008,
  LanguageIsRequired = 1009,

  EmailMustBeValid = 1010,
  UrlMustBeValid = 1011,

  WrongPassword = 1012,
  PasswordsMustMatch = 1013,

  NotFoundUser = 1014,
  NotFoundUserRole = 1015,
  NotFoundAppToken = 1016,
  NotFoundRecentGames = 1017,
  NotFoundEmail = 1018,

  UserIsAlreadyRegistered = 1019,
  AppNameIsAlreadyRegistered = 1020,

  MaxRoomPlayersLessThanOne = 1021,
  PlayedTimeLessThanZero = 1022,
  ScoresLessThanZero = 1023,

  NameLength = 1024,
  PasswordLength = 1025,
  LanguageLength = 1026,

  UserShouldBeActive = 1027,

  NewPasswordIsRequired = 1027,
  OldPasswordIsRequired = 1028,
  RepeatNewPasswordIsRequired = 1029,

  NewPasswordsMustMatch = 1030,
  NewAndOldPasswordsShouldBeDifferent = 1031,
  NewPasswordLength = 1031,
  OldPasswordLength = 1032,
  RepeatNewPasswordLength = 1033,

  AppNameRequired = 1034,
  ApplicationNameLengthError = 1035,
  DescriptionRequired = 1036,
  DescriptionApplicationLengthError = 1037,
  MaxRoomPlayerRequired = 1038,
  MaxRoomPlayerCountError = 1039,
  MaxRoomsRequired = 1040,
  MaxRoomsCountError = 1041,
  RequestUrlRequired = 1042,
  RequestUrlError = 1043,
  MaxWaitingTimeRequired = 1044,
  MaxWaitingTimeError = 1045,
  RedirectUrlRequired = 1046,
  RedirectUrlError = 1047,
  UserIdRequired = 1048,
}

export enum TechnicalErrCodes {
  DatabaseCrash = 2000,
  SaltIsNotGenerated = 2001,
  CanNotBcryptString = 2002,
  CanNotCreateHash = 2003,

  UserRoleIsNotUpsertedInDb = 2004,
  ApplicationTokenIsNotUpsertedInDb = 2005,
  UserRoleIsNotSaveInDb = 2006,
  UserLanguageIsNotUpdatedInDb = 2007,

  MailNotSend = 2008,
}
