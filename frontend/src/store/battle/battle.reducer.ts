import { BattleStatus } from 'models';

import { BattleActionTypes, BattleActions } from './battle.action';
import { initialState } from './battle.initial';

export const battleReducer = (state = initialState, action: BattleActions) => {
  switch (action.type) {
    case BattleActionTypes.JoinBattle: {
      return {
        ...state,
        status: BattleStatus.Wait,
      };
    }

    case BattleActionTypes.LeaveBattle: {
      return {
        ...state,
        status: BattleStatus.Init,
      };
    }

    case BattleActionTypes.RedirectToBattle: {
      return {
        ...state,
        status: BattleStatus.Play,
      };
    }

    case BattleActionTypes.NotifyCountdown: {
      return {
        ...state,
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
