import { connect as nativeConnect } from 'react-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import {
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux';

import { BattleEffects, battleReducer } from './battle';
import { BattleState } from './battle/interfaces';

// (Valiantsin): redux-observable types issue
type Epic = any;

const rootReducers = combineReducers({
  battle: battleReducer
});

const rootEpic: Epic = combineEpics(
  ...BattleEffects
);

const epicMiddleware = createEpicMiddleware(rootEpic);

export interface AppState {
  battle: BattleState
}

export const store = createStore(
  rootReducers,
  applyMiddleware(epicMiddleware)
);

export const connect = nativeConnect;