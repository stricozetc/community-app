import { SnackbarPayload } from 'models';

import { action } from '../decorators';

export enum RestorePasswordTypes {
  SendRestoreRequest = '[restore-password] Send Restore Request',
  SendRestoreRequestSuccess = '[restore-password] Send Restore Request Success',
  SendRestoreRequestError = '[restore-password] Send Restore Request Error',
  ResetRequest = '[restore-password] Reset Request',
}

@action()
export class SendRestoreRequest {
  public readonly type = RestorePasswordTypes.SendRestoreRequest;

  constructor(public payload: string) { }
}

@action()
export class SendRestoreRequestSuccess {
  public readonly type = RestorePasswordTypes.SendRestoreRequestSuccess;
}

@action()
export class SendRestoreRequestFail {
  public readonly type = RestorePasswordTypes.SendRestoreRequestError;

  constructor(public payload: SnackbarPayload ) { }
}

@action()
export class ResetRequest {
  public readonly type = RestorePasswordTypes.ResetRequest;

}

export type RestorePasswordActions =
  | SendRestoreRequest
  | SendRestoreRequestSuccess
  | SendRestoreRequestFail
  | ResetRequest;
