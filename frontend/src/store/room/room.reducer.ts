
import { RoomActionTypes, RoomActions } from './room.action';
import { initialState } from './room.initial';

export const roomReducer = (state = initialState, action: RoomActions) => {
  switch (action.type) {
    case RoomActionTypes.SetRoomsInfo: {
      return {
        ...state,
        roomsInfo: action.payload
      };
    }
    default:
      return state;
  }
};
