import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap, tap, ignoreElements } from 'rxjs/operators';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import { HttpWrapper } from 'services';

import {
  GamesInited,
  InitGames,
  GamesTypes
} from './games.action';

import {
  DataIsLoaded,
  LoadData,
} from './../data/data.action';

import { store } from 'store';
import { InitEvents } from 'store/socket';

import { GetErrors } from '../errors';
import { Game } from 'models';

export const initGames$ = (actions$: ActionsObservable<InitGames>) => actions$
  .ofType(GamesTypes.InitGames).pipe(
    switchMap(() => {
      store.dispatch(new LoadData());

      return fromPromise(HttpWrapper.get('api/mocks/games'))
        .map((res: any) => {
          const games: Game[] = res.data;
          store.dispatch(new DataIsLoaded());

          return new GamesInited(games)
        }).catch(error => {
          store.dispatch(new GetErrors(error.response.data));

          return Observable.of(new DataIsLoaded())
        })
    })
  );

export const gamesInited$ = (actions$: ActionsObservable<GamesInited>) => actions$
  .ofType(GamesTypes.GamesInited).pipe(
    tap(payload => {
      /**
       * @todo unsubscribe events
       */
      store.dispatch(new InitEvents(payload.payload));
    }),
    ignoreElements()
  );

// tslint:disable-next-line:array-type
export const GamesEffects: ((actions$: ActionsObservable<any>) => Observable<any>)[] = [initGames$, gamesInited$];
