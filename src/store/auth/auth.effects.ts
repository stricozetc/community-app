import {ActionsObservable} from 'redux-observable';
import {AxiosWrapper} from './../../services/axiosWrapper.service';

import {Observable} from 'rxjs/Observable';

import {
    AuthTypes,
    LoginUser,
    LogoutUser,
    RedirectToLogin, 
    RegisterUser,
    SetCurrentUser, 
    } from './auth.action';

import {deleteAuthToken, setAuthtoken } from './../../utils/setAuthToken';

import * as jwt_decode from 'jwt-decode';
import {FrontEndUser} from './interfaces';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

import 'rxjs/add/operator/map';

import {GetErrors} from '../errors';


console.log('HELLO WORLD');

import * as Cookies from 'js-cookie';
import {fromPromise} from 'rxjs/observable/fromPromise';


export const loginUser$ = (actions$ : ActionsObservable < LoginUser >) => actions$
    .ofType(AuthTypes.LOGIN_USER)
    .mergeMap(action => fromPromise(AxiosWrapper.loginUser(action.payload)).map(res => {
        const {token} = res.data;
        // Set token to ls
        Cookies.set('jwtToken', token)
        // Set token to Auth header
        setAuthtoken(token);
        // Decode token to get UserData
        const decoded : FrontEndUser = jwt_decode(token);
        console.log(decoded);

        return new SetCurrentUser(decoded);
    }).catch(error => Observable.of(new GetErrors(error.response.data))))

export const registerUser$ = (actions$ : ActionsObservable < RegisterUser >) => actions$
    .ofType(AuthTypes.REGISTER_USER)
    .mergeMap(action => fromPromise(AxiosWrapper.registerUser(action.payload)).map(res => {
        return new RedirectToLogin();
    }).catch((error) => {
        return Observable.of(new GetErrors(error.response.data));
    }));

export const logoutUser$ = (actions$ : ActionsObservable < LogoutUser >) => actions$
    .ofType(AuthTypes.LOGOUT_USER)
    .map(action => {

        Cookies.remove('jwtToken');
        deleteAuthToken();

        return new SetCurrentUser({});
    });

export const AuthEffects : ((actions$ : ActionsObservable < any >) => Observable < any >)[] = [loginUser$, registerUser$, logoutUser$];