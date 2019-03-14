import { Event } from 'models';
import { action } from '../decorators';

export enum EventsActionTypes {
  AddEvent = '[event] Add Event',
  AddEventSuccess = '[event] Add Event (Success)',
  AddEventError = '[event] Add Event (Error)',
  DeleteEvent = '[event] Delete Event',
  DeleteEventSuccess = '[event] Delete Event (Success)',
  DeleteEventError = '[event] Delete Event (Error)',
  EditEvent = '[event] Edit Event',
  EditEventSuccess = '[event] Edit Event (Success)',
  EditEventError = '[event] Edit Event (Error)',
  LoadEvent = '[event] Load Event',
  LoadEventSuccess = '[event] Load Event (Success)',
  LoadEventError = '[event] Load Event (Error)',
  LoadEvents = '[event] Load Events',
  LoadEventsSuccess = '[event] Load Events (Success)',
  LoadEventsError = '[event] Load Events (Error)',
}

@action()
export class AddEvent {
  public readonly type = EventsActionTypes.AddEvent;

  public constructor(public payload: { event: Event, userId: number }) {}
}

@action()
export class AddEventSuccess {
  public readonly type = EventsActionTypes.AddEventSuccess;

  public constructor(public payload: Event) {}
}

@action()
export class AddEventError {
  public readonly type = EventsActionTypes.AddEventError;
}

@action()
export class DeleteEvent {
  public readonly type = EventsActionTypes.DeleteEvent;

  public constructor(public payload: { event: Event, userId: number }) {}
}

@action()
export class DeleteEventSuccess {
  public readonly type = EventsActionTypes.DeleteEventSuccess;

  public constructor(public payload: Event) {}
}

@action()
export class DeleteEventError {
  public readonly type = EventsActionTypes.DeleteEventError;
}

@action()
export class EditEvent {
  public readonly type = EventsActionTypes.EditEvent;

  public constructor(public payload: { event: Event, userId: number }) {}
}

@action()
export class EditEventSuccess {
  public readonly type = EventsActionTypes.EditEventSuccess;

  public constructor(public payload: Event) {}
}

@action()
export class EditEventError {
  public readonly type = EventsActionTypes.EditEventError;
}

@action()
export class LoadEvents {
  public readonly type = EventsActionTypes.LoadEvents;
}

@action()
export class LoadEvent {
  public readonly type = EventsActionTypes.LoadEvent;

  public constructor(public payload: number ) {}
}

@action()
export class LoadEventSuccess {
  public readonly type = EventsActionTypes.LoadEventSuccess;

  public constructor(public payload: Event) {}
}

@action()
export class LoadEventError {
  public readonly type = EventsActionTypes.LoadEventError;
}

@action()
export class LoadEventsSuccess {
  public readonly type = EventsActionTypes.LoadEventsSuccess;

  public constructor(public payload: Event[]) {}
}

@action()
export class LoadEventsError {
  public readonly type = EventsActionTypes.LoadEventsError;
}

export type EventActions =
  | AddEvent
  | AddEventSuccess
  | AddEventError
  | DeleteEvent
  | DeleteEventSuccess
  | DeleteEventError
  | EditEvent
  | EditEventSuccess
  | EditEventError
  | LoadEvent
  | LoadEventSuccess
  | LoadEventError
  | LoadEvents
  | LoadEventsSuccess
  | LoadEventsError;
