import { Action } from 'store/decorators';

export enum FeatureActionTypes {
  ADD_ITEM = '[feature] ADD_ITEM',
  PING = '[feature] PING',
  PONG = '[feature] PONG',
}

@Action()
export class AddItemAction {
  public readonly type = FeatureActionTypes.ADD_ITEM;

  constructor(public payload: string) { }
}

@Action()
export class PingAction {
  public readonly type = FeatureActionTypes.PING;

  constructor(public payload: string) { }
}

@Action()
export class PongAction {
  public readonly type = FeatureActionTypes.PONG;

  constructor(public payload: string) { }
}

export type ApplicationActions =
  | AddItemAction
  | PingAction
  | PongAction;
