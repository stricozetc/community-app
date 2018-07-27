import { Action } from 'redux';

import { action } from 'store/decorators';
import { RoomInfo } from 'models';

export enum BattleActionTypes {
  JoinBattle = '[battle] Join Battle',
  RedirectToBattle = '[battle] Redirect To Battle',
  LeaveBattle = '[battle] Leave Battle',
  SetRoomsInfo = '[battle] Set Rooms Info',
  NotifyCountdown = '[battle] Notify Countdown',
  ErrorBattle = '[battle] Error Battle'
}

@action()
export class JoinBattle implements Action {
  public readonly type = BattleActionTypes.JoinBattle;

  constructor(public payload: string) { }
}

@action()
export class RedirectToBattle implements Action {
  public readonly type = BattleActionTypes.RedirectToBattle;

  constructor(public payload: string) { }
}

@action()
export class LeaveBattle implements Action {
  public readonly type = BattleActionTypes.LeaveBattle;

  constructor(public payload: string) { }
}

@action()
export class SetRoomsInfo implements Action {
  public readonly type = BattleActionTypes.SetRoomsInfo;

  constructor(public payload: RoomInfo[]) { }
}

@action()
export class NotifyCountdown implements Action {
  public readonly type = BattleActionTypes.NotifyCountdown;

  constructor(public payload: number) { }
}

@action()
export class ErrorBattle implements Action {
  public readonly type = BattleActionTypes.ErrorBattle;

  constructor() {
  }
}

export type BattleActions =
  | JoinBattle
  | RedirectToBattle
  | LeaveBattle
  | SetRoomsInfo
  | NotifyCountdown
  | ErrorBattle;
