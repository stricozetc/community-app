import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { tap, ignoreElements } from 'rxjs/operators';

import { InitEvents, EmitEvent, SocketActionTypes } from './socket.action';
import { store } from 'store';

import { SocketService } from './socket.service';

import {
  NotifyCountdown,
  RedirectToBattle,
  SetWaitBattlePlayersCount
} from 'store/battle';

const socketService = new SocketService();

socketService.getRoomUrl().then((url: string) => store.dispatch(new RedirectToBattle(url)));
socketService.waitBattlePlayersCount.subscribe((waitBattlePlayersCount: number) =>
  store.dispatch(new SetWaitBattlePlayersCount(waitBattlePlayersCount)));
socketService.notifyCountdown.subscribe((distance: number) => {
  console.log('Synchronization from server...');
  store.dispatch(new NotifyCountdown(distance));
});

/**
 * @todo add closing socket handler
 */

export const initEvents$ = (actions$: ActionsObservable<InitEvents>) =>
  actions$.ofType(SocketActionTypes.InitEvents).pipe(
    tap(payload => {
      socketService.init(payload.payload);
    }),
    ignoreElements()
  );

export const emitEvent$ = (actions$: ActionsObservable<EmitEvent>) =>
  actions$.ofType(SocketActionTypes.EmitEvent).pipe(
    tap(payload => {
      socketService.emitEvent(payload.payload);
    }),
    ignoreElements()
  );

// tslint:disable-next-line:array-type
export const SocketEffects: ((actions$: ActionsObservable<any>) => Observable<any>)[] = [initEvents$, emitEvent$];
