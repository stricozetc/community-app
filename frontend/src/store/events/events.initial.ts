import { LoadStatus } from 'models';

import { EventState } from './interfaces';

type State = EventState;

export const initialState: State = {
    events: [],
    loadEventsStatus: LoadStatus.Init,
    loadEventStatus: LoadStatus.Init,
    editEventStatus: LoadStatus.Init,
    deleteEventStatus: LoadStatus.Init,
    addEventStatus: LoadStatus.Init
};
