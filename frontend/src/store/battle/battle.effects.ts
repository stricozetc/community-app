import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { ignoreElements, map, tap } from 'rxjs/operators';

import { QuestInfo } from 'models';
import { SocketService } from 'services';
import { store } from 'store';

import {
  BattleActionTypes,
  JoinBattle,
  LeaveBattle,
  NotifyCountdown,
  RedirectToBattle,
  SetWaitBattlePlayersCount
} from './battle.action';

// tslint:disable-next-line:no-var-requires
const questsInfo: QuestInfo[] = require('../../config/quests.json').quests;

// let countdownSubscription: Subscription;

const socketService = new SocketService();
socketService.getRoomUrl().then((url: string) => store.dispatch(new RedirectToBattle(url)));
socketService.waitBattlePlayersCount.subscribe((waitBattlePlayersCount: number) =>
  store.dispatch(new SetWaitBattlePlayersCount(waitBattlePlayersCount)));
socketService.notifyCountdown.subscribe((distance: number) => {
  console.log('Synchronization from server...');
  store.dispatch(new NotifyCountdown(distance));

  /**
   * uncomment this if interval need to be handled in store
   */
  // if (countdownSubscription) {
  //     countdownSubscription.unsubscribe();
  // }

  // countdownSubscription = Observable.interval(1000).pipe(
  //     map(() => {
  //         /**
  //          * @todo questsInfo should be taken from API
  //          * @type {number}
  //          */
  //         const currentCountdown = store.getState().battle.countdown <= 0 ? questsInfo[0] ? questsInfo[0].maxWaitingTime : 0 :
  //             store.getState().battle.countdown;
  //         return currentCountdown - 1000;
  //     }),
  //     takeWhile(() => store.getState().battle.countdown > 0 && store.getState().battle.status === BattleStatus.WAIT)
  // ).subscribe(countdown => {
  //     console.log(countdown);
  //     store.dispatch(new NotifyCountdown(countdown))
  // });
});

export const joinBattle$ = (actions$: ActionsObservable<JoinBattle>) =>
  actions$.ofType(BattleActionTypes.JoinBattle).pipe(
    tap(action => {
      const questInfo: QuestInfo | undefined = questsInfo.find((info: QuestInfo) => info.name === action.payload);
      socketService.emitEvent(questInfo ? questInfo.registrationEventName : '');
    }),
    ignoreElements()
  );

export const leaveBattle$ = (actions$: ActionsObservable<LeaveBattle>) =>
  actions$.ofType(BattleActionTypes.LeaveBattle).pipe(
    tap(action => {
      const questInfo: QuestInfo | undefined = questsInfo.find((info: QuestInfo) => info.name === action.payload);
      socketService.emitEvent(questInfo ? questInfo.leaveEventName : '');
    }),
    ignoreElements()
  );


export const redirectToBattle$ = (actions$: ActionsObservable<RedirectToBattle>) =>
  actions$.ofType(BattleActionTypes.RedirectToBattle).pipe(
    map(action => window.location.replace(action.payload))
  );

// tslint:disable-next-line:array-type
export const BattleEffects: ((actions$: ActionsObservable<any>) => Observable<any>)[] = [joinBattle$, leaveBattle$, redirectToBattle$];
