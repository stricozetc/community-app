import { BattleStatus } from 'models';

import { RoomActionTypes, RoomActions } from './room.action';
import { initialState } from './room.initial';

export const roomReducer = (state = initialState, action: RoomActions) => {
  switch (action.type) {
    case RoomActionTypes.SetRooms: {
      return {
        ...state,
        rooms: action.payload
      };
    }

    case RoomActionTypes.SetPlayerRoom: {
      return {
        ...state,
        currentPlayerRoom: action.payload
      };
    }

    case RoomActionTypes.SetGameId: {
      return {
        ...state,
        currentGameId: action.payload,
      };
    }

    case RoomActionTypes.JoinRoom: {
      return {
        ...state,
        battleStatus: BattleStatus.Wait,
      };
    }

    case RoomActionTypes.LeaveRoom: {
      return {
        ...state,
        battleStatus: BattleStatus.Init,
        currentPlayerRoom: undefined,
        currentGameId: undefined,
      };
    }

    case RoomActionTypes.RedirectToGameRoom: {
      return {
        ...state,
        battleStatus: BattleStatus.Play,
      };
    }

    case RoomActionTypes.NotifyCountdown: {
      return {
        ...state,
      };
    }

    case RoomActionTypes.ErrorRoom: {
      return {
        ...state,
        battleStatus: BattleStatus.Error
      };
    }
    default:
      return state;
  }
};
