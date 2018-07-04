import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { QuestInfo } from 'models';
import { SocketService } from 'services';
import { store } from 'store';

import {
    BattleActionTypes,
    JoinBattle,
    LeaveBattle,
    RedirectToBattle,
    SetWaitBattlePlayersCount,
} from './battle.action';

// tslint:disable-next-line:no-var-requires
const questsInfo: QuestInfo[] = require('../../config/quests.json').quests;

const socketService = new SocketService();
socketService.getRoomUrl().then((url: string) => store.dispatch(new RedirectToBattle(url)));


socketService.waitBattlePlayersCount.subscribe((waitBattlePlayersCount: number) => {
        return store.dispatch(new SetWaitBattlePlayersCount(waitBattlePlayersCount))
})
    
export const joinBattle$ = (actions$: ActionsObservable<JoinBattle>) =>
    actions$.ofType(BattleActionTypes.JoinBattle).pipe(
        map(action => {
            const questInfo: QuestInfo | undefined = questsInfo.find((info: QuestInfo) => info.name === action.payload);
            console.log(questInfo && questInfo.registrationEventName);

            return socketService.emitEvent(questInfo ? questInfo.registrationEventName : '');
        })
    );

export const leaveBattle$ = (actions$: ActionsObservable<LeaveBattle>) =>
    actions$.ofType(BattleActionTypes.LeaveBattle).pipe(
        map(action => {
            const questInfo: QuestInfo | undefined = questsInfo.find((info: QuestInfo) => info.name === action.payload);

            socketService.emitEvent(questInfo ? questInfo.leaveEventName : '');
        })
    );


export const redirectToBattle$ = (actions$: ActionsObservable<RedirectToBattle>) =>
    actions$.ofType(BattleActionTypes.RedirectToBattle).pipe(
        map(action => window.location.replace(action.payload))
    );

// tslint:disable-next-line:array-type
export const BattleEffects: ((actions$: ActionsObservable<any>) => Observable<any>)[] = [
    joinBattle$, 
    leaveBattle$,
    redirectToBattle$
];