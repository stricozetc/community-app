import { action } from 'store/decorators';

export enum BattleActionTypes {
  JoinBattle = '[battle] Join Battle',
  RedirectToBattle = '[battle] Redirect To Battle',
  LeaveBattle = '[battle] Leave Battle',
  NotifyCountdown = '[battle] Notify Countdown',
  ErrorBattle = '[battle] Error Battle'
}

@action()
export class JoinBattle {
  public readonly type = BattleActionTypes.JoinBattle;

  constructor(public payload: string) { }
}

@action()
export class RedirectToBattle {
  public readonly type = BattleActionTypes.RedirectToBattle;

  constructor(public payload: string) { }
}

@action()
export class LeaveBattle {
  public readonly type = BattleActionTypes.LeaveBattle;

  constructor(public payload: string) { }
}

@action()
export class NotifyCountdown {
  public readonly type = BattleActionTypes.NotifyCountdown;

  constructor(public payload: number) { }
}

@action()
export class ErrorBattle {
  public readonly type = BattleActionTypes.ErrorBattle;
}

export type BattleActions =
  | JoinBattle
  | RedirectToBattle
  | LeaveBattle
  | NotifyCountdown
  | ErrorBattle;
