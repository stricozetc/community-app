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
  MyGamesEffects,
  MyGamesState,
  myGamesReducer
} from './my-games';

import { SnackbarErrorMessage } from 'components';

import {
  SnackbarUiState,
  snackbarUiReducer
} from './snackbar';

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
  snackbarUi: snackbarUiReducer,
  myGames: myGamesReducer,
  userSettings: userSettingsReducer,
  events: eventsReducer,
});

const rootEpic = combineEpics(
  ...AuthEffects,
  ...MyGamesEffects,
  ...UserSettingsEffects,
  ...EventsEffects,
);

const epicMiddleware = createEpicMiddleware();

export interface AppState {
  auth: AuthState;
  errors: SnackbarErrorMessage;
  snackbarUi: SnackbarUiState;
  userSettings: UserSettingsState;
  myGames: MyGamesState;
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
