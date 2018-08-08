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
import { AppState, FrontEndUser } from 'store';
import { GetErrors } from 'store/errors';
import { i18nInstance } from 'utils/i18n';

import {
  ChangeLanguage,
  ChangeLanguageSuccess,
  LanguageActionTypes,
  SaveLanguage,
  SaveLanguageFail,
  SaveLanguageSuccess,
} from './language.action';

export const changeLanguage$ = (actions$: ActionsObservable<ChangeLanguage>, state$: Observable<AppState>) =>
  actions$.pipe(
    ofType(LanguageActionTypes.ChangeLanguage),
    withLatestFrom(state$),
    map(([action, state]) => {
      i18nInstance.changeLanguage(action.payload);
      const user: FrontEndUser | undefined = state.auth.user;
      if (user) {
        return new SaveLanguage({ userEmail: user.email, userLanguage: action.payload });
      } else {
        return new ChangeLanguageSuccess();
      }
    })
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
  changeLanguage$,
  saveLanguage$,
  saveLanguageFail$
];
