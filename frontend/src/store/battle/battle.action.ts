import { Action } from 'redux';

import { action } from 'store/decorators';

export enum BattleActionTypes {
    JoinBattle = '[battle] Join Battle',
    RedirectToBattle = '[battle] Redirect To Battle',
    LeaveBattle = '[battle] Leave Battle',
    SetWaitBattlePlayersCount = '[battle] Set Wait Battle Players Count',
    NotifyCountdown = '[battle] Notify Countdown'
}

@action()
export class JoinBattle implements Action {
    public readonly type = BattleActionTypes.JoinBattle;

    constructor(public payload: string) {
    }
}

@action()
export class RedirectToBattle implements Action {
    public readonly type = BattleActionTypes.RedirectToBattle;

    constructor(public payload: string) {
    }
}

@action()
export class LeaveBattle implements Action {
    public readonly type = BattleActionTypes.LeaveBattle;

    constructor(public payload: string) {
    }
}

@action()
export class SetWaitBattlePlayersCount implements Action {
    public readonly type = BattleActionTypes.SetWaitBattlePlayersCount;

    constructor(public payload: number) {
    }
}

@action()
export class NotifyCountdown implements Action {
    public readonly type = BattleActionTypes.NotifyCountdown;

    constructor(public payload: number) {
    }
}

export type BattleActions =
    | JoinBattle
    | RedirectToBattle
    | LeaveBattle
    | SetWaitBattlePlayersCount
    | NotifyCountdown;
