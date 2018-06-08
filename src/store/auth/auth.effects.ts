import {ActionsObservable} from 'redux-observable';
import {HttpWrapper} from './../../services/axiosWrapper.service';

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


// import 'rxjs/add/operator/mergeMap';



import {GetErrors} from '../errors';


import * as Cookies from 'js-cookie';
import {fromPromise} from 'rxjs/observable/fromPromise';


import {mergeMap} from 'rxjs/operators';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


export const loginUser$ = (actions$ : ActionsObservable < LoginUser >) => actions$
    .ofType(AuthTypes.LoginUser).pipe(
        mergeMap(action => fromPromise(HttpWrapper.post('api/users/login', action.payload)).map(res => {
            const {token} = res.data;
            // Set token to ls
            Cookies.set('jwtToken', token)
            // Set token to Auth header
            setAuthtoken(token);
            // Decode token to get UserData
            const decoded : FrontEndUser = jwt_decode(token);
    
            return new SetCurrentUser(decoded);
        }).catch(error => Observable.of(new GetErrors(error.response.data))))
    )
    

export const registerUser$ = (actions$ : ActionsObservable < RegisterUser >) => actions$
    .ofType(AuthTypes.RegisterUser).pipe(
        mergeMap(action => fromPromise(HttpWrapper.post('api/users/register', action.payload)).map(res => {
            return new RedirectToLogin();
        }).catch((error) => {
            return Observable.of(new GetErrors(error.response.data));
        }))
    )
    

export const logoutUser$ = (actions$ : ActionsObservable < LogoutUser >) => actions$
    .ofType(AuthTypes.LogoutUser)
        .map(action => {

            Cookies.remove('jwtToken');
            deleteAuthToken();
    
            return new SetCurrentUser(undefined);
        })
    
    
    
export const AuthEffects : ((actions$ : ActionsObservable < any >) => Observable < any >)[] = [loginUser$, registerUser$, logoutUser$];