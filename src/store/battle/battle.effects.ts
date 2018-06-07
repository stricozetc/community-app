import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { SocketService } from 'services';
import { store } from 'store';
import { QuestInfo } from 'typing/quest-info';

import {
    BattleActionTypes,
    JoinBattleAction,
    LeaveBattleAction,
    RedirectToBattleAction,
    SetWaitBattlePlayersCountAction,
} from './battle.action';

// tslint:disable-next-line:no-var-requires
const questsInfo: QuestInfo[] = require('../../config/quests.json').quests;

const socketService = new SocketService();
socketService.getRoomUrl().then((url: string) => store.dispatch(new RedirectToBattleAction(url)));
socketService.waitBattlePlayersCount.subscribe((waitBattlePlayersCount: number) =>
    store.dispatch(new SetWaitBattlePlayersCountAction(waitBattlePlayersCount)))

export const joinBattle$ = (actions$: ActionsObservable<JoinBattleAction>) =>
    actions$.ofType(BattleActionTypes.JOIN_BATTLE).pipe(
        map(action => {
            const questInfo: QuestInfo | undefined = questsInfo.find((info: QuestInfo) => info.name === action.payload);

            return socketService.emitEvent(questInfo ? questInfo.registrationEventName : '');
        })
    );

export const leaveBattle$ = (actions$: ActionsObservable<LeaveBattleAction>) =>
    actions$.ofType(BattleActionTypes.LEAVE_BATTLE).pipe(
        map(action => {
            const questInfo: QuestInfo | undefined = questsInfo.find((info: QuestInfo) => info.name === action.payload);

            socketService.emitEvent(questInfo ? questInfo.leaveEventName : '');
        })
    );


export const redirectToBattle$ = (actions$: ActionsObservable<RedirectToBattleAction>) =>
    actions$.ofType(BattleActionTypes.REDIRECT_TO_BATTLE).pipe(
        map(action => window.location.replace(action.payload))
    );

// tslint:disable-next-line:array-type
export const BattleEffects: ((actions$: ActionsObservable<any>) => Observable<any>)[] = [joinBattle$, leaveBattle$, redirectToBattle$];
