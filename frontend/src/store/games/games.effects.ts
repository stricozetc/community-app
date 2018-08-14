import { MyGameModel } from 'models';
import { ActionsObservable, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpWrapper } from 'services';
import { InitEvents } from 'store/socket';

import {
  GamesTypes,
  LoadGames,
  LoadGamesError,
  LoadGamesSuccess
} from './games.action';

export const initGames$ = (actions$: ActionsObservable<LoadGames>) =>
  actions$.pipe(
    ofType(GamesTypes.LoadGames),
    switchMap(() =>
      from(HttpWrapper.get('api/mocks/get-games')).pipe(
        map((res: any) => {
          const games: MyGameModel[] = res.data;

          return new LoadGamesSuccess(games);
        }),
        catchError(() => of(new LoadGamesError()))
      )
    )
  );

export const loadGamesSuccess$ = (actions$: ActionsObservable<LoadGamesSuccess>) =>
  actions$.pipe(
    ofType(GamesTypes.LoadGamesSuccess),
    map(payload => {
      /**
       * @todo unsubscribe events
       */
      return new InitEvents(payload.payload);
    })
  );

export const GamesEffects = [
  initGames$,
  loadGamesSuccess$
];
