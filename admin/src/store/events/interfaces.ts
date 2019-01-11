import { Event, LoadStatus } from 'models';

export interface EventState {
  events: Event[];
  loadEventsStatus: LoadStatus;
  editEventStatus: LoadStatus;
  deleteEventStatus: LoadStatus;
  addEventStatus: LoadStatus;
}
