import { ActionsObservable } from 'redux-observable';
import { map } from 'rxjs/operators';

import {
    BattleActionTypes,
    JoinBattleAction,
    LeaveBattleAction,
    RedirectToBattleAction,
    SetWaitBattlePlayersCountAction,
} from './battle.action';

import { SocketService } from 'services';
import { store } from 'store';

const socketService = new SocketService();
socketService.getRoomUrl().then((url: string) => store.dispatch(new RedirectToBattleAction(url)));
socketService.waitBattlePlayersCount.subscribe((waitBattlePlayersCount: number) =>
    store.dispatch(new SetWaitBattlePlayersCountAction(waitBattlePlayersCount)))

export const joinBattle$ = (actions$: ActionsObservable<JoinBattleAction>) =>
    actions$.ofType(BattleActionTypes.JOIN_BATTLE).pipe(
        map(action => socketService.emitEvent('onJsMarathon'))
    );

export const leaveBattle$ = (actions$: ActionsObservable<LeaveBattleAction>) =>
    actions$.ofType(BattleActionTypes.LEAVE_BATTLE).pipe(
        map(action => socketService.emitEvent('onLeaveJsMarathon'))
    );


export const redirectToBattle$ = (actions$: ActionsObservable<RedirectToBattleAction>) =>
    actions$.ofType(BattleActionTypes.REDIRECT_TO_BATTLE).pipe(
        map(action => window.location.replace(action.payload))
    );

export const BattleEffects = [joinBattle$, leaveBattle$, redirectToBattle$];
