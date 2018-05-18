import { ActionsObservable } from 'redux-observable';
import { map } from 'rxjs/operators';
import { FeatureActionTypes, PingAction, PongAction } from './feature.actions';

export const pong$ = (actions$: ActionsObservable<PingAction>) =>
  actions$.ofType(FeatureActionTypes.PING).pipe(
    map(action => new PongAction(action.payload))
  );

export const FeatureEffects = [pong$];
