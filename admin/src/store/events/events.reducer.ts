import { LoadStatus } from 'models';

import {
  EventActions,
  EventsActionTypes
} from './events.action';

import { initialStateEvent } from './events.initial';

export const eventsReducer = (state = initialStateEvent, action: EventActions) => {
  switch (action.type) {
    case EventsActionTypes.LoadEvents: {
      return {
        ...state,
        loadEventsStatus: LoadStatus.Fetching
      };
    }
    case EventsActionTypes.LoadEventsSuccess: {
      return {
        ...state,
        events: action.payload,
        loadEventsStatus: LoadStatus.Success
      };
    }
    case EventsActionTypes.LoadEventsError: {
      return {
        ...state,
        loadEventsStatus: LoadStatus.Error
      };
    }
    case EventsActionTypes.AddEvent: {
      return {
        ...state,
        addEventStatus: LoadStatus.Fetching
      };
    }
    case EventsActionTypes.AddEventSuccess: {
      return {
        ...state,
        events: [...state.events, action.payload],
        addEventStatus: LoadStatus.Success
      };
    }
    case EventsActionTypes.AddEventError: {
      return {
        ...state,
        addEventStatus: LoadStatus.Error
      };
    }

    case EventsActionTypes.DeleteEvent: {
      return {
        ...state,
        deleteEventStatus: LoadStatus.Fetching
      };
    }
    case EventsActionTypes.DeleteEventSuccess: {
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload.id),
        deleteEventStatus: LoadStatus.Success
      };
    }
    case EventsActionTypes.DeleteEventError: {
      return {
        ...state,
        deleteEventStatus: LoadStatus.Error
      };
    }
    case EventsActionTypes.EditEvent: {
      return {
        ...state,
        editEventStatus: LoadStatus.Fetching
      };
    }
    case EventsActionTypes.EditEventSuccess: {
      return {
        ...state,
        events: [...state.events, action.payload],
        editEventStatus: LoadStatus.Success
      };
    }
    case EventsActionTypes.EditEventError: {
      return {
        ...state,
        editEventStatus: LoadStatus.Error
      };
    }

    default:
      return state;
  }
};
