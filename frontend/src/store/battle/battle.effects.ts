import { Game } from 'models';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'store';
import { FrontEndUser } from 'store/auth';
import { EmitEventWithOptions } from 'store/socket';

import {
  BattleActionTypes,
  ErrorBattle,
  JoinBattle,
  LeaveBattle,
  RedirectToBattle
} from './battle.action';

export const joinBattle$ = (actions$: ActionsObservable<JoinBattle>, state$: Observable<AppState>) =>
  actions$.pipe(
    ofType(BattleActionTypes.JoinBattle),
    withLatestFrom(state$),
    map(([action, state]) => {
      const game = state.games.games
        .find((info: Game) => info.name === action.payload);

      let args: any = '';
      const user = state.auth.user;
      if (user) {
        args = user.token;
      }
      let eventName = '';
      if (game) {
        eventName = game.registrationEventName;
      }
      const options = args;

      return new EmitEventWithOptions({ eventName, options });
    })
  );

export const leaveBattle$ = (actions$: ActionsObservable<LeaveBattle>, state$: Observable<AppState>) =>
  actions$.pipe(
    ofType(BattleActionTypes.LeaveBattle),
    withLatestFrom(state$),
    map(([action, state]) => {
      const game = state.games.games
        .find((info: Game) => info.name === action.payload);

      return new EmitEventWithOptions({ eventName: game ? game.leaveEventName : '' });
    })
  );

export const redirectToBattle$ = (actions$: ActionsObservable<RedirectToBattle>, state$: Observable<AppState>) =>
  actions$.pipe(
    ofType(BattleActionTypes.RedirectToBattle),
    withLatestFrom(state$),
    map(([action, state]) => {
      let userToken = '';
      const user = state.auth.user;
      if (user) {
        userToken = user.token;
        return window.location.replace(`${action.payload}/${userToken}`);
      } else {
        return new ErrorBattle();
      }
    })
  );

export const BattleEffects = [
  joinBattle$,
  leaveBattle$,
  redirectToBattle$
];
