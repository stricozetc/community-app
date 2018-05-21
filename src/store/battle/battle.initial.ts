import { BattleStatus } from 'models';
import { BattleState } from './interfaces';

type State = BattleState;

export const initialState: State = {
    status: BattleStatus.INIT,
    waitBattlePlayersCount: 0,
    roomURL: '',
    battleName: ''
};