import { Action } from 'store/decorators';

export enum BattleActionTypes {
    JOIN_BATTLE = '[battle] JOIN_BATTLE',
    REDIRECT_TO_BATTLE = '[battle] REDIRECT_TO_BATTLE',
    LEAVE_BATTLE = '[battle] LEAVE_BATTLE',
    SET_WAIT_BATTLE_PLAYERS_COUNT = '[battle] SET_WAIT_BATTLE_PLAYERS__COUNT'
}

@Action()
export class JoinBattleAction {
    public readonly type = BattleActionTypes.JOIN_BATTLE;

    constructor(public payload: string) { }
}

@Action()
export class RedirectToBattleAction {
    public readonly type = BattleActionTypes.REDIRECT_TO_BATTLE;

    constructor(public payload: string) { }
}

@Action()
export class LeaveBattleAction {
    public readonly type = BattleActionTypes.LEAVE_BATTLE;

    constructor(public payload: string) { }
}

@Action()
export class SetWaitBattlePlayersCountAction {
    public readonly type = BattleActionTypes.SET_WAIT_BATTLE_PLAYERS_COUNT;

    constructor(public payload: number) { }
}

export type BattleActions =
    | JoinBattleAction
    | RedirectToBattleAction
    | LeaveBattleAction
    | SetWaitBattlePlayersCountAction;
