import { ErrorBlock, SnackbarType } from 'models';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, from, of } from 'rxjs';
import { catchError, ignoreElements, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { HttpWrapper } from 'services';
import { AppState, store } from 'store';
import { FrontEndUser } from 'store/auth';
import { OpenSnackbar } from 'store/snackbar';
import { i18nInstance } from 'utils/i18n';

import {
  ChangeLanguage,
  SaveLanguage,
  SaveLanguageSuccess,
  UserSettingsTypes
} from './user-settings.action';

import {
  ChangePassword,
  ChangePasswordSuccess,
  SetLanguage
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
          const messages: ErrorBlock[] =
            !error.response ? [{ msg: error.message }] :
              error.name !== 'Error' ? [{ msg: error.message }] :
                Array.isArray(error.response.data) ? error.response.data :
                  [error.response.data];

          return of(new OpenSnackbar({ type: SnackbarType.Error, messages }));
        })
      )
    )
  );

export const setLanguage$ = (actions$: ActionsObservable<SetLanguage>) =>
  actions$.pipe(
    ofType(UserSettingsTypes.SetLanguage),
    switchMap((action) => {
      return from(HttpWrapper.get<string>(`api/users/get-user-language?email=${action.payload}`)).pipe(
        map(res => {
          return new ChangeLanguage(res.data);
        }),
        catchError((error) => {
          const messages: ErrorBlock[] =
            !error.response ? [{ msg: error.message }] :
              error.name !== 'Error' ? [{ msg: error.message }] :
                Array.isArray(error.response.data) ? error.response.data :
                  [error.response.data];

          return of(new OpenSnackbar({ type: SnackbarType.Error, messages }));
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
          const messages: ErrorBlock[] =
            !error.response ? [{ msg: error.message }] :
              error.name !== 'Error' ? [{ msg: error.message }] :
                Array.isArray(error.response.data) ? error.response.data :
                  [error.response.data];

          return of(new OpenSnackbar({ type: SnackbarType.Error, messages }));
        })
      );
    })
  );

export const UserSettingsEffects = [
  changePassword$,
  setLanguage$,
  changeLanguage$,
  saveLanguage$
];
