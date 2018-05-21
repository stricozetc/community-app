import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { FeatureActionTypes, PingAction, PongAction } from './feature.actions';

export const pong$ = (actions$: ActionsObservable<PingAction>) =>
  actions$.ofType(FeatureActionTypes.PING).pipe(
    map(action => new PongAction(action.payload))
  );

// tslint:disable-next-line:array-type
export const FeatureEffects: ((actions$: ActionsObservable<any>) => Observable<any>)[] = [pong$];
