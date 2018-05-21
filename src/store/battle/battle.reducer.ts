import { BattleStatus } from 'models';

import { BattleActions, BattleActionTypes } from './battle.action';
import { initialState } from './battle.initial';

export const battleReducer = (state = initialState, action: BattleActions) => {
    switch (action.type) {
        case BattleActionTypes.JOIN_BATTLE: {
            return {
                ...state,
                status: BattleStatus.WAIT,
                battleName: action.payload
            };
        }
        case BattleActionTypes.LEAVE_BATTLE: {
            return {
                ...state,
                status: BattleStatus.INIT,
                battleName: action.payload
            };
        }
        case BattleActionTypes.REDIRECT_TO_BATTLE: {
            return {
                ...state,
                roomURL: action.payload,
                status: BattleStatus.PLAY
            };
        }
        case BattleActionTypes.SET_WAIT_BATTLE_PLAYERS_COUNT: {
            return {
                ...state,
                waitBattlePlayersCount: action.payload
            };
        }
        default:
            return state;
    }
}
