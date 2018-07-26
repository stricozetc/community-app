import { Action } from 'redux';

import { action } from 'store/decorators';
import { Game } from 'models';

export enum SocketActionTypes {
  CloseSocket = '[socket] Close Socket',
  InitEvents = '[socket] Init Events',
  EmitEvent = '[socket] Emit Event'
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

export type SocketActions =
  | CloseSocket
  | InitEvents
  | EmitEvent;
