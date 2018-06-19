export interface Item {
  id: string;
  name: string;
}

export enum BattleStatus {
  INIT,
  WAIT,
  PLAY
}

export enum AuthStatus {
  NOT_AUTHORIZED,
  REGISTERED,
  AUTHORIZED
}

export interface QuestInfo {
  id: number;
  name: string;
  registrationEventName: string;
  leaveEventName: string;
  getWaitPlayersCountEventName: string;
  maxRoomPlayer: number;
  requestUrl: string;
}

export interface FrontEndValidationErrorsRegister {
  email: {mustBeCorrect: string,  required: string},
  password: {min: string, required: string},
  name: {min: string, required: string},
}

export interface FrontEndValidationErrorsLogin {
  email: {mustBeCorrect: string,  required: string},
  password: {min: string, required: string},
}

export interface UserFieldsToRegister {
  email: string,
  name: string,
  password: string,
  password2: string
}

export interface UserFieldsToLogin {
  email: string,
  password: string,
}
