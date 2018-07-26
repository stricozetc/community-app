import { ActionsObservable, ofType } from 'redux-observable';
import { tap, ignoreElements } from 'rxjs/operators';

import { InitEvents, EmitEvent, SocketActionTypes } from './socket.action';
import { store } from 'store';

import { SocketService } from './socket.service';

import { NotifyCountdown, RedirectToBattle, SetRoomsInfo } from 'store/battle';
import { RoomInfo } from 'models';
import { EmitEventWithOptions } from 'store/socket';


const socketService = new SocketService();

socketService
  .getRoomUrl()
  .then((url: string) => store.dispatch(new RedirectToBattle(url)));

socketService.roomsInfo.subscribe((roomsInfo: RoomInfo[]) =>
  store.dispatch(new SetRoomsInfo(roomsInfo))
);

socketService.notifyCountdown.subscribe((distance: number) => {
  console.dir('Synchronization from server...');
  store.dispatch(new NotifyCountdown(distance));
});

/**
 * @todo add closing socket handler
 */

export const initEvents$ = (actions$: ActionsObservable<InitEvents>) =>
  actions$.pipe(
    ofType(SocketActionTypes.InitEvents),
    tap(payload => {
      socketService.init(payload.payload);
      socketService.emitEvent('onClientInitialized');
    }),
    ignoreElements()
  );

export const emitEvent$ = (actions$: ActionsObservable<EmitEvent>) =>
  actions$.pipe(
    ofType(SocketActionTypes.EmitEvent),
    tap(action => {
      console.log('[--------]', action.payload);
      console.log('[--------]', action);
      socketService.emitEvent(action.payload);
    }),
    ignoreElements()
  );

export const emitEventWithOptions$ = (
  actions$: ActionsObservable<EmitEventWithOptions>
) =>
  actions$.pipe(
    ofType(SocketActionTypes.EmitEventWithOptions),
    tap(action => {
      console.log('[--------]', action.payload.eventName);
      console.log('[--------]', action.payload.options);
      socketService.emitEventWithOptions(action.payload.eventName, action.payload.options);
    }),
    ignoreElements()
  );

export const SocketEffects = [initEvents$, emitEvent$, emitEventWithOptions$];
