import { BattleStatus } from 'models';

import { BattleActionTypes, BattleActions } from './battle.action';
import { initialState } from './battle.initial';

export const battleReducer = (state = initialState, action: BattleActions) => {
  switch (action.type) {
    case BattleActionTypes.JoinBattle: {
      return {
        ...state,
        status: BattleStatus.Wait,
        battleName: action.payload
      };
    }

    case BattleActionTypes.LeaveBattle: {
      return {
        ...state,
        status: BattleStatus.Init,
        battleName: action.payload,
        countdown: 0
      };
    }

    case BattleActionTypes.RedirectToBattle: {
      return {
        ...state,
        roomURL: action.payload,
        status: BattleStatus.Play,
        countdown: 0
      };
    }

    case BattleActionTypes.NotifyCountdown: {
      return {
        ...state,
        countdown: action.payload
      };
    }

    case BattleActionTypes.ErrorBattle: {
      return {
        ...state,
        status: BattleStatus.Error
      };
    }
    default:
      return state;
  }
};
