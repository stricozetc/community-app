import { LoadStatus } from 'models';

import { EventState } from './interfaces';

type State = EventState;

export const initialState: State = {
    events: [],
    loadEventStatus: LoadStatus.Init,
    loadEventsStatus: LoadStatus.Init,
    editEventStatus: LoadStatus.Init,
    deleteEventStatus: LoadStatus.Init,
    addEventStatus: LoadStatus.Init
};
