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
  QuestsEffects,
  questsReducer,
  QuestsState
} from './quests';

import {
  StatisticEffects,
  statisticReducer,
  StatisticState
} from './statistic';

import {
  dataReducer,
  DataState
} from './data';

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
  quests: questsReducer,
  data: dataReducer,
  statistic: statisticReducer,
  socket: socketReducer
});

const rootEpic: Epic = combineEpics(
  ...BattleEffects,
  ...AuthEffects,
  ...QuestsEffects,
  ...StatisticEffects,
  ...SocketEffects
);

const epicMiddleware = createEpicMiddleware(rootEpic);

export interface AppState {
  battle: BattleState,
  auth: AuthState,
  quests: QuestsState,
  statistic: StatisticState,
  data: DataState,
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
