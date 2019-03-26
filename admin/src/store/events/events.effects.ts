import { ActionsObservable, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpWrapper } from 'services';

import { ErrorBlock, Event, EventModel, SnackbarType } from 'models';

import {
  AddEvent,
  AddEventError,
  AddEventSuccess,
  DeleteEvent,
  DeleteEventError,
  DeleteEventSuccess,
  EditEvent,
  EditEventError,
  EditEventSuccess,
  EventsActionTypes,
  LoadEvents,
  LoadEventsError,
  LoadEventsSuccess,
} from './events.action';

import { OpenSnackbar } from '../snackbar';

export const addEvent$ = (action$: ActionsObservable<AddEvent>) =>
  action$.pipe(
    ofType(EventsActionTypes.AddEvent),
    switchMap(action =>
      from(HttpWrapper.post<EventModel, Event>('api/events/add-event', action.payload))
        .pipe(
          map(res => new AddEventSuccess(res.data)),
          catchError((error) => {
            const messages: ErrorBlock[] = [{ msg: error.response.data }];
            return of(new OpenSnackbar({ type: SnackbarType.Error, messages }), new AddEventError());
          })
        ))
  );

export const deleteEvent$ = (action$: ActionsObservable<DeleteEvent>) =>
  action$.pipe(
    ofType(EventsActionTypes.DeleteEvent),
    switchMap(action =>
      from(HttpWrapper.post('api/events/delete-event', action.payload))
        .pipe(
          map(res => new DeleteEventSuccess(action.payload.event)),
          catchError((error) => {
            const messages: ErrorBlock[] = [{ msg: error.response.body }];
            return of(new OpenSnackbar({ type: SnackbarType.Error, messages }), new DeleteEventError());
          })
        ))
  );

export const editEvent$ = (action$: ActionsObservable<EditEvent>) =>
  action$.pipe(
    ofType(EventsActionTypes.EditEvent),
    switchMap(action =>
      from(HttpWrapper.post('api/events/edit-event', action.payload))
        .pipe(
          map(res => new EditEventSuccess(action.payload)),
          catchError((error) => {
            const messages: ErrorBlock[] = [{ msg: error.response.body }];
            return of(new OpenSnackbar({ type: SnackbarType.Error, messages }), new EditEventError());
          })
        ))
  );

export const loadEvents$ = (action$: ActionsObservable<LoadEvents>) =>
  action$.pipe(
    ofType(EventsActionTypes.LoadEvents),
    switchMap(action =>
      from(HttpWrapper.get<Event[]>('api/events/get-events'))
        .pipe(
          map((res) => new LoadEventsSuccess(res.data)),
          catchError((error) => {
            const messages: ErrorBlock[] = [{ msg: error.response.body }];
            return of(new OpenSnackbar({ type: SnackbarType.Error, messages }), new LoadEventsError());
          })
        ))
  );

export const EventsEffects = [
  addEvent$,
  deleteEvent$,
  editEvent$,
  loadEvents$,
];
