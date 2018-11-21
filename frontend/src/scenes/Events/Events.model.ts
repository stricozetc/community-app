import { History } from 'history';

import {
    AuthStatus
} from 'models';

export interface EventsProps {
    children?: JSX.Element;
    history: History;
    authStatus: AuthStatus;
}
