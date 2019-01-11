import * as Cookies from 'js-cookie';
import * as jwt_decode from 'jwt-decode';
import { ActionsObservable, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, ignoreElements, map, switchMap } from 'rxjs/operators';

import { ErrorBlock, SnackbarType, UserFieldsToLogin } from 'models';
import { HttpWrapper } from 'services';
import { SetLanguage, store } from 'store';
import { OpenSnackbar } from 'store/snackbar';
import { deleteAuthToken, setAuthToken } from 'utils';

import {
  AuthTypes,
  LoginError,
  LoginUser,
  LogoutUser,
  SetCurrentUser,
} from './auth.action';

import { FrontEndUser } from './interfaces';

export const loginUser$ = (actions$: ActionsObservable<LoginUser>) =>
  actions$.pipe(
    ofType(AuthTypes.LoginUser),
    switchMap(action =>
      from(HttpWrapper.post<UserFieldsToLogin, { token: string }>('api/users/login', action.payload)).pipe(
        map(res => {
          const { token } = res.data;
          Cookies.set('jwtTokenAdmin', token);
          setAuthToken(token);
          const decoded: FrontEndUser = jwt_decode(token);

          return new SetCurrentUser(decoded);
        }),
        catchError((error) => {
          const messages: ErrorBlock[] =
            !error.response ? [{ msg: error.message }] :
              error.name !== 'Error' ? [{ msg: error.message }] :
                Array.isArray(error.response.data) ? error.response.data :
                  [error.response.data];

          return of(new OpenSnackbar({ type: SnackbarType.Error, messages }), new LoginError()
          );
        })
      )
    )
  );

export const logoutUser$ = (actions$: ActionsObservable<LogoutUser>) =>
  actions$.pipe(
    ofType(AuthTypes.LogoutUser),
    map(() => {
      Cookies.remove('jwtTokenAdmin');
      deleteAuthToken();

      return new SetCurrentUser(undefined);
    })
  );

export const setCurrentUser$ = (action$: ActionsObservable<SetCurrentUser>) =>
  action$.ofType(AuthTypes.SetCurrentUser).pipe(
    map(action => {
      const user: FrontEndUser | undefined = action.payload;
      if (user) {
        store.dispatch(new SetLanguage(user.email));
      }
    }),
    ignoreElements()
  );

export const AuthEffects = [
  loginUser$,
  logoutUser$,
  setCurrentUser$,
];
