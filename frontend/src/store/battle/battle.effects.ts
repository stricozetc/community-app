import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { ignoreElements, map, tap } from 'rxjs/operators';

import { QuestInfo } from 'models';
import { store } from 'store';
import { EmitEvent } from 'store/socket';

import {
  BattleActionTypes,
  JoinBattle,
  LeaveBattle,
  RedirectToBattle
} from './battle.action';

export const joinBattle$ = (actions$: ActionsObservable<JoinBattle>) =>
  actions$.ofType(BattleActionTypes.JoinBattle).pipe(
    tap(action => {
      const questInfo: QuestInfo | undefined = store.getState().quests.quests
        .find((info: QuestInfo) => info.name === action.payload);
      store.dispatch(new EmitEvent(questInfo ? questInfo.registrationEventName : ''));
    }),
    ignoreElements()
  );

export const leaveBattle$ = (actions$: ActionsObservable<LeaveBattle>) =>
  actions$.ofType(BattleActionTypes.LeaveBattle).pipe(
    tap(action => {
      const questInfo: QuestInfo | undefined = store.getState().quests.quests
        .find((info: QuestInfo) => info.name === action.payload);
      store.dispatch(new EmitEvent(questInfo ? questInfo.leaveEventName : ''));
    }),
    ignoreElements()
  );

export const redirectToBattle$ = (actions$: ActionsObservable<RedirectToBattle>) =>
  actions$.ofType(BattleActionTypes.RedirectToBattle).pipe(
    map(action => window.location.replace(action.payload))
  );

// tslint:disable-next-line:array-type
export const BattleEffects: ((actions$: ActionsObservable<any>) => Observable<any>)[] = [joinBattle$, leaveBattle$, redirectToBattle$];
