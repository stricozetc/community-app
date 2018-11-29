import { SocketStatus } from 'models';

import { SocketActionTypes, SocketActions } from './socket.action';
import { initialState } from './socket.initial';

export const socketReducer = (state = initialState, action: SocketActions) => {
  switch (action.type) {
    case SocketActionTypes.CloseSocket: {
      return {
        ...state,
        status: SocketStatus.Closed
      };
    }

    default:
      return state;
  }
};
