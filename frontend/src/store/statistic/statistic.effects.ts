import { ActionsObservable, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { HttpWrapper } from 'services';

import {
  InitBestUsers,
  InitMostPopularGames,
  InitRecentGames,
  LoadBestUsersCompleted,  
  LoadMostPopularGamesCompleted,  
  LoadRecentGamesCompleted,  
  StatisticTypes
} from './statistic.action';

import { OpenSnackbar } from 'store/snackbar';
import { SnackbarType } from 'models';

export const initBestUsers$ = (actions$: ActionsObservable<InitBestUsers>) =>
  actions$.pipe(
    ofType(StatisticTypes.InitBestUsers),
    switchMap(() =>
      from(HttpWrapper.get('api/v1/statistic/best-users')).pipe(
        map((res: any) => {
          const bestUsers: any[] = res.data;

          return new LoadBestUsersCompleted(bestUsers);
        }),
        catchError((error) => {
          return of(new OpenSnackbar({type: SnackbarType.error, message: error.response.data}))  
        })
      )
    )
  );

export const initMostPopularGames$ = (actions$: ActionsObservable<InitMostPopularGames>) =>
  actions$.pipe(
    ofType(StatisticTypes.InitMostPopularGames),
    switchMap(() =>
      from(HttpWrapper.get('api/v1/statistic/most-popular-games')).pipe(
        map((res: any) => {
          const popGames: any[] = res.data;

          return new LoadMostPopularGamesCompleted(popGames);
        }),
        catchError((error) => {
          return of(new OpenSnackbar({type: SnackbarType.error, message: error.response.data}))
          })
      )
    )
  );

export const initRecentGames$ = (actions$: ActionsObservable<InitRecentGames>) =>
  actions$.ofType(StatisticTypes.InitRecentGames).pipe(
    switchMap((action) =>
      from(HttpWrapper.get(`api/v1/statistic/recent-games?userId=${action.userToken}`)).pipe(
        map((res: any) => {
          const rg: any[] = res.data;
          
          return new LoadRecentGamesCompleted(rg);
        }),
        catchError((error) => {          
          return of(new OpenSnackbar({type: SnackbarType.error, message: error.response.data}))
        })
      )
    )
  );  

export const StatisticEffects = [
  initBestUsers$,
  initMostPopularGames$,
  initRecentGames$,
];
