import { ActionsObservable, ofType } from 'redux-observable';
import { from, of } from 'rxjs';

import {
  catchError,
  // ignoreElements,
  map,
  switchMap,
} from 'rxjs/operators';

import { SnackbarType } from 'models';
import { HttpWrapper } from 'services';

import { OpenSnackbar } from '../snackbar';

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
          catchError((error) => of(new SendRestoreRequestFail(error.response.data))
        )
      )
    )
  );

export const sendRestorePasswordRequestFail$ = (actions$: ActionsObservable<SendRestoreRequestFail>) =>
  actions$.pipe(
    ofType(RestorePasswordTypes.SendRestoreRequestError),
    map(() => new OpenSnackbar({
      type: SnackbarType.Error,
      messages: [{msg: 'Error of password restoration'}]
    }),
  ),
  );

export const RestorePasswordEffects = [
  sendRestorePasswordRequest$,
  sendRestorePasswordRequestFail$
];
