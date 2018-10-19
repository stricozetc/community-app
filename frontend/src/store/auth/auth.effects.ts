import * as Cookies from 'js-cookie';
import * as jwt_decode from 'jwt-decode';
import { ActionsObservable, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, ignoreElements, map, switchMap } from 'rxjs/operators';

import { ErrorBlock, SnackbarType, UserFieldsToLogin } from 'models';
import { HttpWrapper } from 'services';
import { SetLanguage, store } from 'store';
import { OpenSnackbar } from 'store/snackbar';
import { deleteAuthToken, history, setAuthToken } from 'utils';

import {
  AuthTypes,
  LoginError,
  LoginUser,
  LogoutUser,
  RegisterUser,
  RegistrationError,
  RegistrationSuccess,
  SetCurrentUser,
  SocialNetworksLogin,
} from './auth.action';

import { FrontEndUser } from './interfaces';

export const loginUser$ = (actions$: ActionsObservable<LoginUser>) =>
  actions$.pipe(
    ofType(AuthTypes.LoginUser),
    switchMap(action =>
      from(HttpWrapper.post<UserFieldsToLogin, { token: string }>('api/users/login', action.payload)).pipe(
        map(res => {
          const { token } = res.data;
          Cookies.set('jwtToken', token);
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

export const registerUser$ = (actions$: ActionsObservable<RegisterUser>) =>
  actions$.pipe(
    ofType(AuthTypes.RegisterUser),
    switchMap(action =>
      from(HttpWrapper.post('api/users/register', action.payload)).pipe(
        map(() => new RegistrationSuccess('/login')),
        catchError((error) => {
          const messages: ErrorBlock[] =
            !error.response ? [{ msg: error.message }] :
              error.name !== 'Error' ? [{ msg: error.message }] :
                Array.isArray(error.response.data) ? error.response.data :
                  [error.response.data];

          return of(new OpenSnackbar({ type: SnackbarType.Error, messages }), new RegistrationError()
          );
        })
      )
    )
  );

export const successRegistration$ = (action$: ActionsObservable<RegistrationSuccess>) =>
  action$.ofType(AuthTypes.RegistrationSuccess).pipe(
    map(action => {
      history.push(action.payload);
    }),
    ignoreElements()
  );

export const logoutUser$ = (actions$: ActionsObservable<LogoutUser>) =>
  actions$.pipe(
    ofType(AuthTypes.LogoutUser),
    map(() => {
      Cookies.remove('jwtToken');
      deleteAuthToken();
      console.log(`logout`);
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

export const socialNetworksLogin$ = (actions$: ActionsObservable<SocialNetworksLogin>) =>
  actions$.pipe(
    ofType(AuthTypes.SocialNetworksLogin),
    switchMap(action =>
      from(HttpWrapper.post<object, FrontEndUser>('api/users/google-auth', action.payload)).pipe(
        map(res => {
          const { token } = res.data;
          Cookies.set('jwtToken', token);
          setAuthToken(token);
          const decoded: FrontEndUser = jwt_decode(token);

          return new SetCurrentUser(decoded);

        }),
        catchError((error) => {
          const messages: ErrorBlock[] =
            !error.response ? [{ msg: error.code }] :
              error.name !== 'Error' ? [{ msg: error.message }] :
                Array.isArray(error.response.data) ? error.response.data :
                  [error.response.data];

          return of(new OpenSnackbar({ type: SnackbarType.Error, messages }));
        })
      )
    )
  );

export const AuthEffects = [
  loginUser$,
  registerUser$,
  logoutUser$,
  successRegistration$,
  setCurrentUser$,
  socialNetworksLogin$,
];
