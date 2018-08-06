import { action } from '../decorators';

export enum RestorePasswordTypes {
  SendRestoreRequest = '[restore-password] Send Restore Request',
  SendRestoreRequestSuccess = '[restore-password] Send Restore Request Success',
  SendRestoreRequestFail = '[restore-password] Send Restore Request Fail',
}

@action()
export class SendRestoreRequest {
  public readonly type = RestorePasswordTypes.SendRestoreRequest;

  constructor(public payload: string) { }
}

@action()
export class SendRestoreRequestSuccess {
  public readonly type = RestorePasswordTypes.SendRestoreRequestSuccess;

  constructor() { }
}

@action()
export class SendRestoreRequestFail {
  public readonly type = RestorePasswordTypes.SendRestoreRequestFail;

  constructor(public payload: any) { }
}

export type RestorePasswordActions =
  | SendRestoreRequest
  | SendRestoreRequestSuccess
  | SendRestoreRequestFail;
