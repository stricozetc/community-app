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

import { errorsReducer } from './errors';

// (Valiantsin): redux-observable types issue
type Epic = any;

const rootReducers = combineReducers({
  battle: battleReducer,
  auth: authReducer,
  errors: errorsReducer,
  games: gamesReducer,
  statistic: statisticReducer,
  socket: socketReducer
});

const rootEpic: Epic = combineEpics(
  ...BattleEffects,
  ...AuthEffects,
  ...GamesEffects,
  ...StatisticEffects,
  ...SocketEffects
);

const epicMiddleware = createEpicMiddleware(rootEpic);

export interface AppState {
  battle: BattleState,
  auth: AuthState,
  games: GamesState,
  statistic: StatisticState,
  errors: {},
  socket: SocketState
}

// tslint:disable-next-line:no-angle-bracket-type-assertion
const reduxDevTools = (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__();

const composeForAllBrowsers = (devTools: any) => {
  return devTools ? compose(
    applyMiddleware(epicMiddleware),
    devTools
    )
    : compose(
      applyMiddleware(epicMiddleware)
    )
};

export const store = createStore(
  rootReducers,
  composeForAllBrowsers(reduxDevTools)
);

export const connect = nativeConnect;
