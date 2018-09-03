import { connect as nativeConnect } from 'react-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux';

import {
  AuthEffects,
  AuthState,
  authReducer
} from './auth';

import {
  GamesEffects,
  GamesState,
  gamesReducer
} from './games';

import {
  StatisticEffects,
  StatisticState,
  statisticReducer
} from './statistic';

import {
  SocketEffects,
  SocketState,
  socketReducer
} from './socket';

import {
  UserSettingsEffects,
  UserSettingsState,
  userSettingsReducer
} from './userSettings';

import {
  SnackbarUiState,
  snackbarUiReducer
} from './snackbar';

import {
  MyGamesEffects,
  MyGamesState,
  myGamesReducer
} from './my-games';

import {
  RestorePasswordEffects,
  RestorePasswordState,
  restorePasswordReducer
} from './restore-password';

import {
  RoomEffects,
  RoomState,
  roomReducer
} from './room';
import { SnackbarErrorMessage } from 'components';

const rootReducers = combineReducers({
  auth: authReducer,
  games: gamesReducer,
  statistic: statisticReducer,
  socket: socketReducer,
  snackbarUi: snackbarUiReducer,
  myGames: myGamesReducer,
  userSettings: userSettingsReducer,
  restorePassword: restorePasswordReducer,
  room: roomReducer,
});

const rootEpic = combineEpics(
  ...AuthEffects,
  ...GamesEffects,
  ...StatisticEffects,
  ...SocketEffects,
  ...MyGamesEffects,
  ...UserSettingsEffects,
  ...RestorePasswordEffects,
  ...RoomEffects,
);

const epicMiddleware = createEpicMiddleware();

export interface AppState {
  auth: AuthState;
  games: GamesState;
  statistic: StatisticState;
  errors: SnackbarErrorMessage[];
  socket: SocketState;
  snackbarUi: SnackbarUiState;
  restorePassword: RestorePasswordState;
  userSettings: UserSettingsState;
  myGames: MyGamesState;
  room: RoomState;
}

const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

const composeForAllBrowsers = (devTools: any) => {
  return devTools ? compose(
    applyMiddleware(epicMiddleware),
    devTools
  )
    : compose(
      applyMiddleware(epicMiddleware)
    );
};

export const store = createStore(
  rootReducers,
  composeForAllBrowsers(reduxDevTools)
);

epicMiddleware.run(rootEpic);

export const connect = nativeConnect;
