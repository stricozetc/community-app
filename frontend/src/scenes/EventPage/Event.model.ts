import { History } from 'history';
import { match } from 'react-router';

import {
    AuthStatus,
    Event,
    LoadStatus
} from 'models';

export interface EventProps {
    children?: JSX.Element;
    history: History;
    authStatus: AuthStatus;
    match: match<number>;
    events: Event[];
    loadEventStatus: LoadStatus;

    loadEvent(id: number): void;
}
