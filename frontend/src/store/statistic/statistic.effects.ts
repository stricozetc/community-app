import { ActionsObservable, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { BestUser, Leaders, MostPopularGames, RecentGames, SnackbarType, } from 'models';
import { HttpWrapper } from 'services';
import { OpenSnackbar } from 'store/snackbar';

import {
  InitBestUsers,
  InitLeaders,
  InitMostPopularGames,
  InitRecentGames,
  LoadBestUsersCompleted,
  LoadLeadersCompleted,
  LoadMostPopularGamesCompleted,
  LoadRecentGamesCompleted,
  StatisticTypes,

} from './statistic.action';

export const initBestUsers$ = (actions$: ActionsObservable<InitBestUsers>) =>
  actions$.pipe(
    ofType(StatisticTypes.InitBestUsers),
    switchMap(() =>
      from(HttpWrapper.get('api/v1/statistic/best-users')).pipe(
        map((res) => {
          const bestUsers: BestUser[] = res.data;

          return new LoadBestUsersCompleted(bestUsers);
        }),
        catchError((error) => {
          return of(new OpenSnackbar({ type: SnackbarType.Error, message: error.response.data }));
        })
      )
    )
  );

export const initMostPopularGames$ = (actions$: ActionsObservable<InitMostPopularGames>) =>
  actions$.pipe(
    ofType(StatisticTypes.InitMostPopularGames),
    switchMap(() =>
      from(HttpWrapper.get('api/v1/statistic/most-popular-games')).pipe(
        map((res) => {
          const popGames: MostPopularGames[] = res.data;

          return new LoadMostPopularGamesCompleted(popGames);
        }),
        catchError((error) => {
          return of(new OpenSnackbar({ type: SnackbarType.Error, message: error.response.data }));
        })
      )
    )
  );

export const initRecentGames$ = (actions$: ActionsObservable<InitRecentGames>) =>
  actions$.ofType(StatisticTypes.InitRecentGames).pipe(
    switchMap((action) =>
      from(HttpWrapper.get(`api/v1/statistic/recent-games?userId=${action.userToken}`)).pipe(
        map((res) => {
          const rg: RecentGames[] = res.data;

          return new LoadRecentGamesCompleted(rg);
        }),
        catchError((error) => {
          return of(new OpenSnackbar({ type: SnackbarType.Error, message: error.response.data }));
        })
      )
    )
  );

export const initLeaders$ = (actions$: ActionsObservable<InitLeaders>) =>
  actions$.ofType(StatisticTypes.InitLeaders).pipe(
    switchMap((action) =>
      from(HttpWrapper.get(`api/v1/statistic/get-leaders?appName=${action.appName}`)).pipe(
        map((res) => {
          const leaders: Leaders[] = res.data;

          return new LoadLeadersCompleted(leaders);
        }),
        catchError((error) => {
          return of(new OpenSnackbar({ type: SnackbarType.Error, message: error.response.data }));
        })
      )
    )
  );

export const StatisticEffects = [
  initBestUsers$,
  initMostPopularGames$,
  initRecentGames$,
  initLeaders$
];
