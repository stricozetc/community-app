import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { ignoreElements, map, tap } from 'rxjs/operators';

import { Game } from 'models';
import { store } from 'store';
import { EmitEvent } from 'store/socket';

import {
  BattleActionTypes,
  JoinBattle,
  LeaveBattle,
  RedirectToBattle,
  ErrorBattle
} from './battle.action';

import { FrontEndUser } from '../auth';

export const joinBattle$ = (actions$: ActionsObservable<JoinBattle>) =>
  actions$.ofType(BattleActionTypes.JoinBattle).pipe(
    tap(action => {
      const game: Game | undefined = store.getState().games.games
        .find((info: Game) => info.name === action.payload);


      let options: string = '';
      const user: FrontEndUser | undefined = store.getState().auth.user;
      if (user) {
        
		options = user.token;      }
      let eventName = '';
      if (game) {
        eventName = game.registrationEventName;
      }

      store.dispatch(new EmitEvent({ eventName, options }));
    }),
    ignoreElements()
  );

export const leaveBattle$ = (actions$: ActionsObservable<LeaveBattle>) =>
  actions$.ofType(BattleActionTypes.LeaveBattle).pipe(
    tap(action => {
      const game: Game | undefined = store.getState().games.games
        .find((info: Game) => info.name === action.payload);
      store.dispatch(new EmitEvent({ eventName: game ? game.leaveEventName : '' }));
    }),
    ignoreElements()
  );

export const redirectToBattle$ = (actions$: ActionsObservable<RedirectToBattle>) =>
  actions$.ofType(BattleActionTypes.RedirectToBattle).pipe(
    map(action => {

      let userToken: string = '';
      const user: FrontEndUser | undefined = store.getState().auth.user;
      if (user) {
        userToken = user.token;
        return window.location.replace(`${action.payload}/${userToken}`);
      } else {
        return store.dispatch(new ErrorBattle());
      }
    })
  );

// tslint:disable-next-line:array-type
export const BattleEffects: ((actions$: ActionsObservable<any>) => Observable<any>)[] = [joinBattle$, leaveBattle$, redirectToBattle$];
