import { Game } from 'models';
import { ActionsObservable } from 'redux-observable';
import { ignoreElements, map, tap } from 'rxjs/operators';
import { store } from 'store';
import { FrontEndUser } from 'store/auth';
import { EmitEventWithOptions } from 'store/socket';

import {
  BattleActionTypes,
  ErrorBattle,
  JoinBattle,
  LeaveBattle,
  RedirectToBattle
} from './battle.action';

export const joinBattle$ = (actions$: ActionsObservable<JoinBattle>) =>
  actions$.ofType(BattleActionTypes.JoinBattle).pipe(
    tap(action => {
      const game: Game | undefined = store.getState().games.games
        .find((info: Game) => info.name === action.payload);

      let args: any = '';
      const user: FrontEndUser | undefined = store.getState().auth.user;
      if (user) {
        args = user.token;
      }
      let eventName = '';
      if (game) {
        eventName = game.registrationEventName;
      }
      const options = args;

      store.dispatch(new EmitEventWithOptions({ eventName, options }));
    }),
    ignoreElements()
  );

export const leaveBattle$ = (actions$: ActionsObservable<LeaveBattle>) =>
  actions$.ofType(BattleActionTypes.LeaveBattle).pipe(
    tap(action => {
      const game: Game | undefined = store.getState().games.games
        .find((info: Game) => info.name === action.payload);

      store.dispatch(new EmitEventWithOptions({ eventName: game ? game.leaveEventName : '' }));
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

export const BattleEffects = [
  joinBattle$,
  leaveBattle$,
  redirectToBattle$
];
