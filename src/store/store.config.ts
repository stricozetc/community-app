import { connect as nativeConnect } from 'react-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { AuthEffects, authReducer } from './auth';


import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux';

import { AuthState } from './auth/interfaces';

import { BattleEffects, battleReducer } from './battle';
import { BattleState } from './battle/interfaces';


import { errorsReducer } from './errors';


// (Valiantsin): redux-observable types issue
type Epic = any;

const rootReducers = combineReducers({
  battle: battleReducer,
  auth: authReducer,
  errors: errorsReducer
});

const rootEpic: Epic = combineEpics(
  ...BattleEffects,
  ...AuthEffects
);

const epicMiddleware = createEpicMiddleware(rootEpic);

export interface AppState {
  battle: BattleState,
  auth: AuthState,
  errors: {}
}

export const store = createStore(
  rootReducers,
  compose (
    applyMiddleware(epicMiddleware),
    (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
  )
  
);

export const connect = nativeConnect;