import { Action } from 'redux';

import { Game } from 'models';
import { action } from 'store/decorators';

export enum SocketActionTypes {
  CloseSocket = '[socket] Close Socket',
  InitEvents = '[socket] Init Events',
  EmitEvent = '[socket] Emit Event',
  EmitEventWithOptions = '[socket] Emit Event With Options'
}

@action()
export class CloseSocket implements Action {
  public readonly type = SocketActionTypes.CloseSocket;
}

@action()
export class InitEvents implements Action {
  public readonly type = SocketActionTypes.InitEvents;

  public constructor(public payload: Game[]) {
  }
}

@action()
export class EmitEvent implements Action {
  public readonly type = SocketActionTypes.EmitEvent;

  public constructor(public payload: string) {
  }
}

@action()
export class EmitEventWithOptions implements Action {
  public readonly type = SocketActionTypes.EmitEventWithOptions;

  public constructor(public payload: { eventName: string, options?: any }) {
  }
}

export type SocketActions =
  | CloseSocket
  | InitEvents
  | EmitEvent
  | EmitEventWithOptions;
