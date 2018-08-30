import { RoomInfo } from 'models';
import { ActionsObservable, ofType } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';
import { store } from 'store';
import { NotifyCountdown, RedirectToBattle } from 'store/battle';
import { EmitEventWithOptions } from 'store/socket';

// toDo: fix imports
import { SetRoomsInfo } from '../room';
import { InitLeaders } from '../statistic/statistic.action';

import {
  EmitEvent,
  InitEvents,
  SocketActionTypes,
} from './socket.action';
import { SocketService } from './socket.service';

const socketService = new SocketService();

socketService
  .getRoomUrl()
  .then((url: string) => store.dispatch(new RedirectToBattle(url)));

socketService.updateLeadersBoard.subscribe((appName: string) => {
  store.dispatch(new InitLeaders(appName));
});

socketService.roomsInfo.subscribe((roomsInfo: RoomInfo[]) => {
  return store.dispatch(new SetRoomsInfo(roomsInfo));
});

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
      socketService.emitEventWithOptions(action.payload.eventName, action.payload.options);
    }),
    ignoreElements()
  );

export const SocketEffects = [initEvents$, emitEvent$, emitEventWithOptions$];
