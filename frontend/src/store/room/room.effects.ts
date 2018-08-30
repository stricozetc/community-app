import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import { RoomInfo } from 'models';
import { AppState } from 'store';

import { SetRoomId } from '../battle';

import {
  RoomActionTypes,
  SetRoomsInfo,
  SetRoomsInfoError
} from './room.action';

export const emitEvent$ = (actions$: ActionsObservable<SetRoomsInfo>, state$: Observable<AppState>) =>
  actions$.pipe(
    ofType(RoomActionTypes.SetRoomsInfo),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const roomsInfo: RoomInfo[] = action.payload;
      const foundRoomInfo: RoomInfo | undefined = roomsInfo.find((roomInfo: RoomInfo) =>
        roomInfo.playersCount !== roomInfo.maxPlayersCount &&
        roomInfo.gameId === state.battle.gameId
      );
      return foundRoomInfo ? of(new SetRoomId(foundRoomInfo.id)) : of(new SetRoomsInfoError());
    })
  );

export const RoomEffects = [
  emitEvent$,
];
