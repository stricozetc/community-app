import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap, tap, ignoreElements } from 'rxjs/operators';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import { HttpWrapper } from 'services';

import {
  QuestsInited,
  InitQuests,
  QuestsTypes
} from './quests.action';

import {
  DataIsLoaded,
  LoadData,
} from './../data/data.action';

import { store } from 'store';
import { InitEvents } from 'store/socket';

import { GetErrors } from '../errors';
import { QuestInfo } from 'models';

export const initQuests$ = (actions$: ActionsObservable<InitQuests>) => actions$
  .ofType(QuestsTypes.InitQuests).pipe(
    switchMap(() => {
      store.dispatch(new LoadData());

      return fromPromise(HttpWrapper.get('api/mocks/quests'))
        .map((res: any) => {
          const quests: QuestInfo[] = res.data;
          store.dispatch(new DataIsLoaded());

          return new QuestsInited(quests)
        }).catch(error => {
          store.dispatch(new GetErrors(error.response.data));

          return Observable.of(new DataIsLoaded())
        })
    })
  );

export const questsInited$ = (actions$: ActionsObservable<QuestsInited>) => actions$
  .ofType(QuestsTypes.QuestsInited).pipe(
    tap(payload => {
      /**
       * @todo unsubscribe events
       */
      store.dispatch(new InitEvents(payload.payload));
    }),
    ignoreElements()
  );

// tslint:disable-next-line:array-type
export const QuestsEffects: ((actions$: ActionsObservable<any>) => Observable<any>)[] = [initQuests$, questsInited$];
