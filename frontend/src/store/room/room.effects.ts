import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import { RoomInfo } from 'models';
import { AppState } from 'store';

import {
  RoomActionTypes,
  SetPlayerRoom,
  SetRooms,
  SetRoomsError,
} from './room.action';

export const emitEvent$ = (actions$: ActionsObservable<SetRooms>, state$: Observable<AppState>) =>
  actions$.pipe(
    ofType(RoomActionTypes.SetRooms),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const room: RoomInfo[] = action.payload;
      const foundRoomInfo: RoomInfo | undefined = room.find((roomInfo: RoomInfo) =>
        roomInfo.playersCount !== roomInfo.maxPlayersCount &&
        roomInfo.gameId === state.room.currentGameId
      );
      return foundRoomInfo ? of(new SetPlayerRoom(foundRoomInfo)) : of(new SetRoomsError());
    })
  );

export const RoomEffects = [
  emitEvent$,
];
