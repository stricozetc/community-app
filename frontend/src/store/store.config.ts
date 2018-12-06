import { connect as nativeConnect } from 'react-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import {
  AuthEffects,
  AuthState,
  authReducer
} from './auth';

import {
  StoreEnhancer,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';

import {
  GamesEffects,
  GamesState,
  gamesReducer
} from './games';

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

import {
  SnackbarUiState,
  snackbarUiReducer
} from './snackbar';

import {
  SocketEffects,
  SocketState,
  socketReducer
} from './socket';

import {
  StatisticEffects,
  StatisticState,
  statisticReducer
} from './statistic';

import {
  UserSettingsEffects,
  UserSettingsState,
  userSettingsReducer
} from './userSettings';

import {
  EventState,
  EventsEffects,
  eventsReducer
} from './events';

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
  events: eventsReducer,
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
  ...EventsEffects,
);

const epicMiddleware = createEpicMiddleware();

export interface AppState {
  auth: AuthState;
  games: GamesState;
  statistic: StatisticState;
  errors: SnackbarErrorMessage;
  socket: SocketState;
  snackbarUi: SnackbarUiState;
  restorePassword: RestorePasswordState;
  userSettings: UserSettingsState;
  myGames: MyGamesState;
  room: RoomState;
  events: EventState;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function;
  }
}

const reduxDevTools: StoreEnhancer<{
  dispatch: {};
}, {}> = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const composeForAllBrowsers = (devTools: StoreEnhancer<{
  dispatch: {};
}, {}>) => {
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
  composeForAllBrowsers(reduxDevTools as StoreEnhancer<{
    dispatch: {};
  }, {}>)
);

epicMiddleware.run(rootEpic);

export const connect = nativeConnect;
