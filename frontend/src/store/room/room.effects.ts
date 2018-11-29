import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { ignoreElements, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { GameModel, RoomInfo } from 'models';
import { AppState, EmitEventWithOptions } from 'store';

import {
  ErrorRoom,
  JoinRoom,
  LeaveRoom,
  RedirectToGameRoom,
  RoomActionTypes,
  SetGameId,
  SetPlayerRoom,
  SetRooms,
  SetRoomsError,
} from './room.action';

export const setPlayerRoom$ = (actions$: ActionsObservable<SetRooms>, state$: Observable<AppState>) =>
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

export const joinBattle$ = (actions$: ActionsObservable<JoinRoom>, state$: Observable<AppState>) =>
  actions$.pipe(
    ofType(RoomActionTypes.JoinRoom),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const game: GameModel | undefined = state.games.games
        .find((info: GameModel) => info.appName === action.payload);

      let args: string = '';
      const user = state.auth.user;
      if (user) {
        args = user.token;
      }
      let eventName = '';
      if (game) {
        eventName = game.registrationEventName;
      }
      const options = args;

      return of(new SetGameId(game && game.id ? game.id : NaN), new EmitEventWithOptions({ eventName, options }));
    })
  );

export const leaveBattle$ = (actions$: ActionsObservable<LeaveRoom>, state$: Observable<AppState>) =>
  actions$.pipe(
    ofType(RoomActionTypes.LeaveRoom),
    withLatestFrom(state$),
    map(([action, state]) => {
      const game = state.games.games
        .find((info: GameModel) => info.appName === action.payload);

      return new EmitEventWithOptions({ eventName: game ? game.leaveEventName : '' });
    })
  );

export const redirectToBattle$ = (actions$: ActionsObservable<RedirectToGameRoom>, state$: Observable<AppState>) =>
  actions$.pipe(
    ofType(RoomActionTypes.RedirectToGameRoom),
    withLatestFrom(state$),
    map(([action, state]) => {
      let userToken = '';
      const user = state.auth.user;
      if (user) {
        userToken = user.token;
        return window.location.replace(`${action.payload}/${userToken}`);
      } else {
        return new ErrorRoom();
      }
    }),
    ignoreElements()
  );

export const RoomEffects = [
  setPlayerRoom$,
  joinBattle$,
  leaveBattle$,
  redirectToBattle$,
];
