import * as Cookies from 'js-cookie';
import * as jwt_decode from 'jwt-decode';

import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap } from 'rxjs/operators';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {
  deleteAuthToken,
  history,
  setAuthToken
} from 'utils';

import { HttpWrapper } from 'services';

import {
  AuthTypes,
  LoginUser,
  LogoutUser,
  RegisterUser,
  SetCurrentUser,
} from './auth.action';

import { GetErrors } from '../errors';
import { FrontEndUser } from './interfaces';


export const loginUser$ = (actions$: ActionsObservable<LoginUser>) => actions$
  .ofType(AuthTypes.LoginUser).pipe(
    switchMap(action => fromPromise(HttpWrapper.post('api/users/login', action.payload))
      .map(res => {
        const { token } = res.data;
        Cookies.set('jwtToken', token);
        setAuthToken(token);
        const decoded: FrontEndUser = jwt_decode(token);

        return new SetCurrentUser(decoded);
      }).catch(error => Observable.of(new GetErrors(error.response.data))))
  );

export const registerUser$ = (actions$: ActionsObservable<RegisterUser>) => actions$
  .ofType(AuthTypes.RegisterUser).pipe(
    switchMap(action => fromPromise(HttpWrapper.post('api/users/register', action.payload))
      .map(() => history.push('/login'))
      .catch((error) => {
        return Observable.of(new GetErrors(error.response.data));
      }))
  );

export const logoutUser$ = (actions$: ActionsObservable<LogoutUser>) => actions$
  .ofType(AuthTypes.LogoutUser)
  .map(() => {
    Cookies.remove('jwtToken');
    deleteAuthToken();

    return new SetCurrentUser(undefined);
  });

// tslint:disable-next-line:array-type
export const AuthEffects: ((actions$: ActionsObservable<any>) => Observable<any>)[] = [loginUser$, registerUser$, logoutUser$];
