
import { ActionsObservable, ofType } from 'redux-observable';
import { from, of } from 'rxjs';

import {
  catchError,
  ignoreElements,
  map,
  switchMap
} from 'rxjs/operators';

import { HttpWrapper } from 'services';
import { GetErrors } from 'store/errors';

import {
  RestorePasswordTypes,
  SendRestoreRequest,
  SendRestoreRequestFail,
  SendRestoreRequestSuccess,
} from './restore-password.action';

export const sendRestorePasswordRequest$ = (actions$: ActionsObservable<SendRestoreRequest>) =>
  actions$.pipe(
    ofType(RestorePasswordTypes.SendRestoreRequest),
    switchMap(action =>
      from(HttpWrapper.post('api/restore-password/send-mail', { userEmail: action.payload })).pipe(
        map(() => new SendRestoreRequestSuccess()),
        catchError((error) => of(new SendRestoreRequestFail(error)))
      )
    )
  );

export const sendRestorePasswordRequestFail$ = (actions$: ActionsObservable<SendRestoreRequestFail>) =>
  actions$.pipe(
    ofType(RestorePasswordTypes.SendRestoreRequestFail),
    map((action) => new GetErrors(action.payload.response.data)),
    ignoreElements()
  );

export const RestorePasswordEffects = [
  sendRestorePasswordRequest$,
  sendRestorePasswordRequestFail$
];
