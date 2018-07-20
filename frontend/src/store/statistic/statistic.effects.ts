import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap } from 'rxjs/operators';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpWrapper } from 'services';

import {
  BestUsersInited,
  InitBestUsers,
  InitMostPopularGames,
  InitRecentGames,
  MostPopularGamesInited,
  RecentGamesInited,
  StatisticTypes
} from './statistic.action';

import { GetErrors } from '../errors';

export const initBestUsers$ = (actions$: ActionsObservable<InitBestUsers>) => actions$
  .ofType(StatisticTypes.InitBestUsers).pipe(
    switchMap(() => {

      return fromPromise(HttpWrapper.get('api/mocks/best-users'))
        .map((res: any) => {
          const bastUsers: any[] = res.data;

          return new BestUsersInited(bastUsers);
            }).catch(error => {
              return Observable.of(new GetErrors(error));
            });
          })
    );

export const initMostPopularGames$ = (actions$: ActionsObservable<InitMostPopularGames>) => actions$
  .ofType(StatisticTypes.InitMostPopularGames).pipe(
    switchMap(() => {

      return fromPromise(HttpWrapper.get('api/mocks/most-popular-games'))
        .map((res: any) => {

          const popGames: any[] = res.data;

          return new MostPopularGamesInited(popGames);
            }).catch(error => {

              return Observable.of(new GetErrors(error));
            });
          })
    );

export const initRecentGames$ = (actions$: ActionsObservable<InitRecentGames>) => actions$
  .ofType(StatisticTypes.InitRecentGames).pipe(
    switchMap(() => {

      return fromPromise(HttpWrapper.get('api/mocks/recent-games'))
        .map((res: any) => {
          const rg: any[] = res.data;

          return new RecentGamesInited(rg);
            }).catch(error => {
              return Observable.of(new GetErrors(error));
            });
          })
    );
// tslint:disable-next-line:array-type
export const StatisticEffects: ((actions$: ActionsObservable<any>) => Observable<any>)[] = [
  initBestUsers$,
  initMostPopularGames$,
  initRecentGames$,
];
