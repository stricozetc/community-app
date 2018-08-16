import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, from, of } from 'rxjs';
import { catchError, ignoreElements, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { HttpWrapper } from 'services';
import { AppState, store } from 'store';
import { FrontEndUser } from 'store/auth';
import { i18nInstance } from 'utils/i18n';

/* import { GetErrors } from '../errors'; */
import { OpenSnackbar } from 'store/snackbar';
import { SnackbarType } from 'models';

import {
  ChangeLanguage,
  SaveLanguage,
  /* SaveLanguageError, */
  SaveLanguageSuccess,
  UserSettingsTypes
} from './user-settings.action';

import {
  ChangePassword,
  /* ChangePasswordError, */
  ChangePasswordSuccess,
  SetLanguage,
} from './user-settings.action';

export const changePassword$ = (actions$: ActionsObservable<ChangePassword>) =>
  actions$.pipe(
    ofType(UserSettingsTypes.ChangePassword),
    switchMap((action) =>
      from(HttpWrapper.post('api/v1/user-settings/change-password', action.payload)).pipe(
        map(() => {
          return new ChangePasswordSuccess();
        }),
        catchError((error) => {
          return of(new OpenSnackbar({type: SnackbarType.error, message: error.response.data}))  
        })
      )
    )
  );

export const setLanguage$ = (actions$: ActionsObservable<SetLanguage>) =>
  actions$.pipe(
    ofType(UserSettingsTypes.SetLanguage),
    switchMap((action) => {
      return from(HttpWrapper.get(`api/users/get-user-language?email=${action.payload}`)).pipe(
        map(res => {
          return new ChangeLanguage(res.data);
        }),
        catchError((error) => {
          return of(new OpenSnackbar({type: SnackbarType.error, message: error.response.data}))  
        })
      );
    })
  );

export const changeLanguage$ = (actions$: ActionsObservable<ChangeLanguage>, state$: Observable<AppState>) =>
  actions$.pipe(
    ofType(UserSettingsTypes.ChangeLanguage),
    withLatestFrom(state$),
    map(([action, state]) => {
      i18nInstance.changeLanguage(action.payload);
      const user: FrontEndUser | undefined = state.auth.user;
      if (user) {
        store.dispatch(new SaveLanguage({ userEmail: user.email, userLanguage: action.payload }));
      }
    }),
    ignoreElements()
  );

export const saveLanguage$ = (actions$: ActionsObservable<SaveLanguage>) =>
  actions$.pipe(
    ofType(UserSettingsTypes.SaveLanguage),
    switchMap((action) => {
      return from(HttpWrapper.post('api/users/user-language', action.payload)).pipe(
        map(() => new SaveLanguageSuccess()),
        catchError((error) => {
          return of(new OpenSnackbar({type: SnackbarType.error, message: error.response.data}))  
        })
      );
    })
  );

/* export const saveLanguageError$ = (actions$: ActionsObservable<SaveLanguageError>) =>
  actions$.pipe(
    ofType(UserSettingsTypes.SaveLanguageError),
    map(() => new GetErrors(new Error('Fail save language'))),
    ignoreElements()
  ); */

export const UserSettingsEffects = [
  changePassword$,
  setLanguage$,
  changeLanguage$,
  saveLanguage$,
  /* saveLanguageError$, */
];
