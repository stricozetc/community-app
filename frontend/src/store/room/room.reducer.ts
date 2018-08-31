
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
    default:
      return state;
  }
};
