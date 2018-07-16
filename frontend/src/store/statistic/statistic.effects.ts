import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap } from 'rxjs/operators';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import { HttpWrapper } from 'services';

import {

  InitBestUsers,
  InitMostPopularGames,
  InitRecentGames,

  LoadMostPopularGamesCompleted,
  LoadRecentGamesCompleted,
  LoadBestUsersCompleted,
  LoadMostPopularGamesFailed,
  LoadBestUsersFailed,
  LoadRecentGamesFailed,
  StatisticTypes
} from './statistic.action';




export const initBestUsers$ = (actions$: ActionsObservable<InitBestUsers>) => actions$
  .ofType(StatisticTypes.InitBestUsers).pipe(
    switchMap(() => {

      return fromPromise(HttpWrapper.get('api/mocks/best-users'))
        .map((res: any) => {
          const bastUsers: any[] = res.data;


              return new LoadBestUsersCompleted(bastUsers)
            }).catch(error => {
;
              return Observable.of(new LoadBestUsersFailed(error));
            })  
          })
    )

export const initMostPopularGames$ = (actions$: ActionsObservable<InitMostPopularGames>) => actions$
  .ofType(StatisticTypes.InitMostPopularGames).pipe(
    switchMap(() => {
      
      return fromPromise(HttpWrapper.get('api/mocks/most-popular-games'))
        .map((res: any) => {
          
          const popGames: any[] = res.data;
            
 
            return new LoadMostPopularGamesCompleted(popGames)
            }).catch(error => {
              
             
              return Observable.of(new LoadMostPopularGamesFailed(error))  
            })  
          })
    )


export const initRecentGames$ = (actions$: ActionsObservable<InitRecentGames>) => actions$
  .ofType(StatisticTypes.InitRecentGames).pipe(
    switchMap(() => {

      return fromPromise(HttpWrapper.get('api/mocks/recent-games'))
        .map((res: any) => {
          const rg: any[] = res.data;

         
              return new LoadRecentGamesCompleted(rg)
            }).catch(error => {
          
              return Observable.of(new LoadRecentGamesFailed(error))  
            })  
          })
    )
// tslint:disable-next-line:array-type
export const StatisticEffects: ((actions$: ActionsObservable<any>) => Observable<any>)[] = [
  initBestUsers$,
  initMostPopularGames$,
  initRecentGames$,
];
