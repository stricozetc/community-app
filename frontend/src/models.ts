import { EChartOption } from 'echarts/lib/echarts';

export interface Item {
  id: string;
  name: string;
}

export interface WinRateDiagramData {
  options: EChartOption;
}

export enum BattleStatus {
  INIT,
  WAIT,
  PLAY,
  ERROR
}

export enum ResultStatus {
  INIT,
  WIN,
  LOSE,
  DRAW
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

export interface FrontEndValidationErrorsChangePassword {
  oldPassword: { required: string, min: string },
  newPassword: { required: string, min: string },
  repeatNewPassword: { required: string, min: string, mustMatch: string }
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
  Init,
  Fetching,
  Success,
  Error
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

export enum languages {
  en = 'en',
  ru = 'ru'
}

export enum RowProperty {
  name = 'name',
  playedTime = 'playedTime',
  scores = 'scores',
  playedInWeek = 'playedInWeek',
  game = 'game',
  appName = 'appName',
  result = 'result',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt'
}

export enum TypeOfColumn {
  string = 'String',
  timeCount = 'Spent Time',
  points = 'Points',
  result = 'Result',
  date = 'Date'
}
export interface GameModel {
  id?: number;
  userId?: number;
  appName: string;
  description: string;
  maxRoomPlayer: number;
  maxRooms: number;
  requestUrl: string;
  maxWaitingTime: number;
  createAt?: Date;
  updatedAt?: Date;
  redirectUrl: string;
  registrationEventName: string;
  leaveEventName: string;
  updateRoomsInfoEventName: string;
  notifyCountdown: string;
  approve: boolean;
}
export interface HeaderName {
  headerName: string;
  field: RowProperty;
  type: TypeOfColumn;
  editAction?(payload: number): void;
  deleteAction?(payload: GameModel): void;
}

export interface Row {
  [key: string]: any;
}

export interface GameForSettingForm {
  appName: string;
  description: string;
  maxRoomPlayer: number;
  maxRooms: number;
  requestUrl: string;
  maxWaitingTime: number;
  redirectUrl: string;
}

export enum SettingFormType {
  editGame = 'Edit Game',
  addGame = 'Add Game'
}

export enum chartsTypes {
  winRate = 'winRate',
  noChartsAvailable = 'noChartsAvailable'
}

export const JsMarathonCharts: string[] = [chartsTypes.winRate];

export const MyGameCharts: string[] = [chartsTypes.winRate];
export interface Errors {
  [key: string]: [{ code: number; msg: string }];
}

////////////////////////////
export interface FrontEndValidationErrorsGameRegister {
  appName: { length: string, required: string };
  description: { length: string, required: string };
  maxRoomPlayer: { count: string, required: string };
  maxRooms: { count: string, required: string };
  requestUrl: { mustBeCorrect: string, required: string };
  maxWaitingTime: { mustBeCorrect: string, required: string };
  redirectUrl: { mustBeCorrect: string, required: string };
}
