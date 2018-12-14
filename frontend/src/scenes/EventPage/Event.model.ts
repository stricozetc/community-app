import { History } from 'history';

import {
    AuthStatus
} from 'models';

export interface EventProps {
    children?: JSX.Element;
    history: History;
    authStatus: AuthStatus;
}
