import { connect as nativeConnect } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { FeatureEffects, featureReducer, FeatureState } from './feature';

// (Valiantsin): redux-observable types issue
type Epic = any;

const rootReducers = combineReducers({
  feature: featureReducer
});

const rootEpic: Epic = combineEpics(
  ...FeatureEffects
);

const epicMiddleware = createEpicMiddleware(rootEpic);

export interface AppState {
  feature: FeatureState
}

export const store = createStore(
  rootReducers,
  applyMiddleware(epicMiddleware)
);

export const connect = nativeConnect;