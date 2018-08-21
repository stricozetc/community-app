import { EChartOption } from 'echarts/lib/echarts';

export interface WinRateDiagramData {
  OPTIONS: EChartOption;
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

export enum RoomStatus {
  WAITING,
  IN_GAME,
  CLOSED
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
  language: string;
}

export interface UserFieldsToLogin {
  email: string;
  password: string;
}

export enum LoadStatus {
  INIT,
  FETCHING,
  SUCCESS,
  ERROR
}

export enum StatTab {
  BEST_USERS = 0,
  THE_MOST_POPULAR_GAMES = 1,
  RECENT_GAMES = 2
}

export interface ErrorsFromServer {
  [key: string]: { code: number; msg: string };
}

export interface FrontEndSnackbarData {
  type: 'error' | 'warning' | 'info' | 'success';
  msg: string;
}

export enum SnackbarType {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success'
}

export enum transitionDirection {
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down'
}

export enum Languages {
  EN = 'en',
  RU = 'ru'
}

export enum RowProperty {
  NAME = 'name',
  PLAYED_TIME = 'playedTime',
  SCORES = 'scores',
  PLAYED_IN_WEEK = 'playedInWeek',
  GAME = 'game',
  APP_NAME = 'appName',
  RESULT = 'result',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}

export enum TypeOfColumn {
  STRING = 'String',
  TIME_COUNT = 'Spent Time',
  POINTS = 'Points',
  RESULT = 'Result',
  DATE = 'Date'
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
  appToken?: string;
}
export interface HeaderName {
  headerName: string;
  field: RowProperty;
  type: TypeOfColumn;
  editAction?(payload: number): void;
  deleteAction?(payload: GameModel): void;
  lockAction?(payload: string): void;
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
  EDIT_GAME = 'Edit Game',
  ADD_GAME = 'Add Game'
}

export enum chartsTypes {
  WIN_RATE = 'winRate',
  NO_CHARTS_AVAILABLE = 'noChartsAvailable'
}

export const JsMarathonCharts: string[] = [chartsTypes.WIN_RATE];

export const MyGameCharts: string[] = [chartsTypes.WIN_RATE];
export interface Errors {
  [key: string]: [{ code: number; msg: string }];
}

export interface AppMenuItem {
  icon: JSX.Element;
  title: string;
  action: () => void;
}

export interface FrontEndValidationErrorsGameRegister {
  appName: { length: string, required: string };
  description: { length: string, required: string };
  maxRoomPlayer: { count: string, required: string };
  maxRooms: { count: string, required: string };
  requestUrl: { mustBeCorrect: string, required: string };
  maxWaitingTime: { mustBeCorrect: string, required: string };
  redirectUrl: { mustBeCorrect: string, required: string };
}
