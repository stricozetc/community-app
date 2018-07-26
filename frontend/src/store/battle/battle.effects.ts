import { ActionsObservable, ofType } from 'redux-observable';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { Game } from 'models';
import { AppState } from 'store';
import { EmitEvent } from 'store/socket';
import { Observable } from 'rxjs';

import {
  BattleActionTypes,
  JoinBattle,
  LeaveBattle,
  RedirectToBattle
} from './battle.action';

export const joinBattle$ = (actions$: ActionsObservable<JoinBattle>, state$: Observable<AppState>) =>
  actions$.pipe(
    ofType(BattleActionTypes.JoinBattle),
    withLatestFrom(state$),
    map(([action, state]) => {
      const game: Game | undefined = state.games.games
        .find((info: Game) => info.name === action.payload);

      return new EmitEvent(game ? game.registrationEventName : '');
    })
  );

export const leaveBattle$ = (actions$: ActionsObservable<LeaveBattle>, state$: Observable<AppState>) =>
  actions$.pipe(
    ofType(BattleActionTypes.LeaveBattle),
    withLatestFrom(state$),
    tap(([action, state]) => {
      const game: Game | undefined = state.games.games
        .find((info: Game) => info.name === action.payload);

      return new EmitEvent(game ? game.leaveEventName : '');
    }),
  );

export const redirectToBattle$ = (actions$: ActionsObservable<RedirectToBattle>) =>
  actions$.pipe(
    ofType(BattleActionTypes.RedirectToBattle),
    map(action => window.location.replace(action.payload))
  );

export const BattleEffects = [
  joinBattle$,
  leaveBattle$,
  redirectToBattle$
];
