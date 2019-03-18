import { History } from 'history';
import { match } from 'react-router';

import {
    AuthStatus,
    Event
} from 'models';

export interface EventProps {
    children?: JSX.Element;
    history: History;
    authStatus: AuthStatus;
    match: match<number>;
    events: Event[];

    loadEvent(id: number): void;
}
