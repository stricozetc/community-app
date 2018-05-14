import { connect as nativeConnect } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { featureReducer, FeatureState } from './feature';

const rootReducers = combineReducers({
  feature: featureReducer
});

export interface AppState {
  feature: FeatureState
}

export const store = createStore(
  rootReducers
);

export const connect = nativeConnect;