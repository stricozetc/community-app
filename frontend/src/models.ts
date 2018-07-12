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

export enum SocketStatus {
  OPENED,
  CLOSED
}

export interface Game {
  id: number;
  appName: string;
  name: string;
  desc: string;
  registrationEventName: string;
  leaveEventName: string;
  updateRoomsInfoEventName: string;
  maxRoomPlayer: number;
  maxRooms: number;
  requestUrl: string;
  maxWaitingTime: number;
  notifyCountdown: string;
  battleTime: number;
}

export enum RoomStatus {
  Waiting,
  InGame,
  Closed
}

export interface RoomInfo {
  id: number;
  gameId: number;
  maxPlayersCount: number;
  playersCount: number;
  status: RoomStatus;
  distance?: number;
}

export interface FrontEndValidationErrorsRegister {
  email: { mustBeCorrect: string, required: string };
  password: { min: string, required: string };
  name: { min: string, required: string };
}

export interface FrontEndValidationErrorsLogin {
  email: { mustBeCorrect: string, required: string };
  password: { min: string, required: string };
}

export interface UserFieldsToRegister {
  email: string;
  name: string;
  password: string;
  password2: string;
}

export interface UserFieldsToLogin {
  email: string;
  password: string;
}

export enum LoadStatus {
  INIT,
  FETCHING,
  COMPLETED,
  FAILED
}

export interface ErrorsFromServer {
  [key: string]: { code: number; msg: string };
}
