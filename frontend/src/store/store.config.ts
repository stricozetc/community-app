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
  authReducer,
  AuthState
} from './auth';

import {
  BattleEffects,
  battleReducer,
  BattleState
} from './battle';

import {
  GamesEffects,
  gamesReducer,
  GamesState
} from './games';

import {
  StatisticEffects,
  statisticReducer,
  StatisticState
} from './statistic';

import {
  SocketEffects,
  socketReducer,
  SocketState
} from './socket';

import {
  snackbarUiReducer,
  SnackbarUiState
} from './snackbar';

import { errorsReducer } from './errors';

const rootReducers = combineReducers({
  battle: battleReducer,
  auth: authReducer,
  errors: errorsReducer,
  games: gamesReducer,
  statistic: statisticReducer,
  socket: socketReducer,
  snackbarUi: snackbarUiReducer
});

const rootEpic = combineEpics(
  ...BattleEffects,
  ...AuthEffects,
  ...GamesEffects,
  ...StatisticEffects,
  ...SocketEffects
);

const epicMiddleware = createEpicMiddleware();

export interface AppState {
  battle: BattleState;
  auth: AuthState;
  games: GamesState;
  statistic: StatisticState;
  errors: {};
  socket: SocketState;
  snackbarUi: SnackbarUiState;
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
