import { ActionsObservable, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpWrapper } from 'services';

import { UserSettingsTypes } from './user-settings.action';

import {
  ChangePassword,
  ChangePasswordCompleted,
  ChangePasswordFailed
} from './user-settings.action';

export const changePassword$ = (actions$: ActionsObservable<ChangePassword>) =>
  actions$.pipe(
    ofType(UserSettingsTypes.ChangePassword),
    switchMap((action) =>
      from(HttpWrapper.post('api/v1/user-settings/change-password', action.payload)).pipe(
        map((res: any) => {
          return new ChangePasswordCompleted();
        }),
        catchError(error => of(new ChangePasswordFailed(error.response.data)))
      )
    )
  );

export const UserSettingsEffects = [
  changePassword$
];
