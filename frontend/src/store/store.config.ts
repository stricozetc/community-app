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
  dataReducer,
  DataState
} from './data';

import { errorsReducer } from './errors';





// (Valiantsin): redux-observable types issue
type Epic = any;

const rootReducers = combineReducers({
  battle: battleReducer,
  auth: authReducer,
  errors: errorsReducer,
  games: gamesReducer,
  data: dataReducer
});

const rootEpic: Epic = combineEpics(
  ...BattleEffects,
  ...AuthEffects,
  ...GamesEffects
);

const epicMiddleware = createEpicMiddleware(rootEpic);

export interface AppState {
  battle: BattleState,
  auth: AuthState,
  games: GamesState,
  data: DataState
  errors: {}
}
// tslint:disable-next-line:no-angle-bracket-type-assertion
const reduxDevTools = (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__();

const composeForAllBrowsers = (reduxDevTools: any) => {
  return reduxDevTools ? compose(
    applyMiddleware(epicMiddleware),
    reduxDevTools
  ) 
  : compose(
    applyMiddleware(epicMiddleware)
  )

}
export const store = createStore(
  rootReducers,
  composeForAllBrowsers(reduxDevTools)
);

export const connect = nativeConnect;
