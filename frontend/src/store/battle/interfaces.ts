import { BattleStatus } from 'models';

export interface BattleState {
    status: BattleStatus,
    waitBattlePlayersCount: number,
    roomURL: string,
    battleName: string,
    countdown: number
}
