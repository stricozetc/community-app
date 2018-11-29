import { GameModel } from 'models';
import { action } from 'store/decorators';

export enum SocketActionTypes {
  CloseSocket = '[socket] Close Socket',
  InitEvents = '[socket] Init Events',
  EmitEvent = '[socket] Emit Event',
  EmitEventWithOptions = '[socket] Emit Event With Options'
}

@action()
export class CloseSocket {
  public readonly type = SocketActionTypes.CloseSocket;
}

@action()
export class InitEvents {
  public readonly type = SocketActionTypes.InitEvents;

  public constructor(public payload: GameModel[]) {
  }
}

@action()
export class EmitEvent {
  public readonly type = SocketActionTypes.EmitEvent;

  public constructor(public payload: string) {
  }
}

@action()
export class EmitEventWithOptions {
  public readonly type = SocketActionTypes.EmitEventWithOptions;

  public constructor(public payload: { eventName: string, options?: string }) {
  }
}

export type SocketActions =
  | CloseSocket
  | InitEvents
  | EmitEvent
  | EmitEventWithOptions;
