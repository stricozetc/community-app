import { Event, LoadStatus } from 'models';

export interface EventState {
  events: Event[];
  loadEventStatus: LoadStatus;
  loadEventsStatus: LoadStatus;
  editEventStatus: LoadStatus;
  deleteEventStatus: LoadStatus;
  addEventStatus: LoadStatus;
}
