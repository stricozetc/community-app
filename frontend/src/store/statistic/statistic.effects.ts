import { ActionsObservable, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { BestUser, ErrorBlock, Leaders, MostPopularGames, RecentGames, SnackbarType } from 'models';
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
      from(HttpWrapper.get<BestUser[]>('api/v1/statistic/best-users')).pipe(
        map((response) => new LoadBestUsersCompleted(response.data)),
        catchError((error) => {
          const messages: ErrorBlock[] =
            !error.response ? [{ msg: error.code }] :
              error.name !== 'Error' ? [{ msg: error.message }] :
                Array.isArray(error.response.data) ? error.response.data :
                  [error.response.data];

          return of(new OpenSnackbar({ type: SnackbarType.Error, messages }));
        })
      )
    )
  );

export const initMostPopularGames$ = (actions$: ActionsObservable<InitMostPopularGames>) =>
  actions$.pipe(
    ofType(StatisticTypes.InitMostPopularGames),
    switchMap(() =>
      from(HttpWrapper.get<MostPopularGames[]>('api/v1/statistic/most-popular-games')).pipe(
        map((response) => new LoadMostPopularGamesCompleted(response.data)),
        catchError((error) => {
          const messages: ErrorBlock[] =
            !error.response ? [{ msg: error.message }] :
              error.name !== 'Error' ? [{ msg: error.message }] :
                Array.isArray(error.response.data) ? error.response.data :
                  [error.response.data];

          return of(new OpenSnackbar({ type: SnackbarType.Error, messages }));
        })
      )
    )
  );

export const initRecentGames$ = (actions$: ActionsObservable<InitRecentGames>) =>
  actions$.ofType(StatisticTypes.InitRecentGames).pipe(
    switchMap((action) =>
      from(HttpWrapper.get<RecentGames[]>(`api/v1/statistic/recent-games?userId=${action.userToken}`)).pipe(
        map((response) => new LoadRecentGamesCompleted(response.data)),
        catchError((error) => {
          console.log();
          const messages: ErrorBlock[] =
            !error.response ? [{ msg: error.message }] :
              error.name !== 'Error' ? [{ msg: error.message }] :
                Array.isArray(error.response.data) ? error.response.data :
                  [error.response.data];

          return of(new OpenSnackbar({ type: SnackbarType.Error, messages }));
        })
      )
    )
  );

export const initLeaders$ = (actions$: ActionsObservable<InitLeaders>) =>
  actions$.ofType(StatisticTypes.InitLeaders).pipe(
    switchMap((action) =>
      from(HttpWrapper.get<Leaders[]>(`api/v1/statistic/get-leaders?appName=${action.appName}`)).pipe(
        map((response) => new LoadLeadersCompleted(response.data)),
        catchError((error) => {
          const messages: ErrorBlock[] =
            !error.response ? [{ msg: error.message }] :
              error.name !== 'Error' ? [{ msg: error.message }] :
                Array.isArray(error.response.data) ? error.response.data :
                  [error.response.data];

          return of(new OpenSnackbar({ type: SnackbarType.Error, messages }));
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
