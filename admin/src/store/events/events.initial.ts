import { LoadStatus } from 'models';

import { EventState } from './interfaces';

type State = EventState;

export const initialStateEvent: State = {
    events: [],
    loadEventsStatus: LoadStatus.Init,
    editEventStatus: LoadStatus.Init,
    deleteEventStatus: LoadStatus.Init,
    addEventStatus: LoadStatus.Init
};
