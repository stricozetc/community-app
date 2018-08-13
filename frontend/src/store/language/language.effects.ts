import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, from, of } from 'rxjs';

import {
  catchError,
  ignoreElements,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import { HttpWrapper } from 'services/axiosWrapper.service';
import { AppState, FrontEndUser, store } from 'store';
import { GetErrors } from 'store/errors';
import { i18nInstance } from 'utils/i18n';

import {
  ChangeLanguage,
  LanguageActionTypes,
  SaveLanguage,
  SaveLanguageFail,
  SaveLanguageSuccess,
  SetLanguage,
} from './language.action';

export const setLanguage$ = (actions$: ActionsObservable<SetLanguage>) =>
  actions$.pipe(
    ofType(LanguageActionTypes.SetLanguage),
    switchMap((action) => {
      return from(HttpWrapper.get(`api/users/get-user-language?email=${action.payload}`)).pipe(
        map(res => {
          return new ChangeLanguage(res.data);
        }),
        catchError(error => of(new GetErrors(error.response.data)))
      );
    })
  );

export const changeLanguage$ = (actions$: ActionsObservable<ChangeLanguage>, state$: Observable<AppState>) =>
  actions$.pipe(
    ofType(LanguageActionTypes.ChangeLanguage),
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
    ofType(LanguageActionTypes.SaveLanguage),
    switchMap((action) => {
      return from(HttpWrapper.post('api/users/user-language', action.payload)).pipe(
        map(() => new SaveLanguageSuccess()),
        catchError(() => of(new SaveLanguageFail()))
      );
    })
  );

export const saveLanguageFail$ = (actions$: ActionsObservable<SaveLanguageFail>) =>
  actions$.pipe(
    ofType(LanguageActionTypes.SaveLanguageFail),
    map(() => new GetErrors(new Error('Fail save language'))),
    ignoreElements()
  );

export const LanguageEffects = [
  setLanguage$,
  changeLanguage$,
  saveLanguage$,
  saveLanguageFail$
];
