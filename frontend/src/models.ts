export interface Item {
  id: string;
  name: string;
}

export enum BattleStatus {
  INIT,
  WAIT,
  PLAY,
  ERROR
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
  redirectUrl: string;
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

export enum StatTab {
  BestUsers = 0,
  TheMostPopularGames = 1,
  RecentGames = 2
}

export interface ErrorsFromServer {
  [key: string]: { code: number; msg: string };
}

export interface FrontEndSnackbarData {
  type: 'error' | 'warning' | 'info' | 'success';
  msg: string;
}

export enum SnackbarType {
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success'
}

export enum transitionDirection {
  left = 'left',
  right = 'right',
  up = 'up',
  down = 'down'
}
