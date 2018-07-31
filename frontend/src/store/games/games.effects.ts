import { Game } from 'models';
import { ActionsObservable, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpWrapper } from 'services';
import { InitEvents } from 'store/socket';

import {
  GamesTypes,
  InitGames,
  LoadGamesCompleted,
  LoadGamesFailed
} from './games.action';

export const initGames$ = (actions$: ActionsObservable<InitGames>) =>
  actions$.pipe(
    ofType(GamesTypes.InitGames),
    switchMap(() =>
      from(HttpWrapper.get('api/mocks/games')).pipe(
        map((res: any) => {

          const games: Game[] = res.data;

          return new LoadGamesCompleted(games);
        }),
        catchError(() => of(new LoadGamesFailed()))
      )
    )
  );

export const loadGamesCompleted$ = (actions$: ActionsObservable<LoadGamesCompleted>) =>
  actions$.pipe(
    ofType(GamesTypes.LoadGamesCompleted),
    map(payload => {
      /**
       * @todo unsubscribe events
       */
      return new InitEvents(payload.payload);
    })
  );

export const GamesEffects = [
  initGames$,
  loadGamesCompleted$
];
