import { History } from 'history';
import { AuthStatus, Event } from 'models';
import { FrontEndUser } from 'store';

export interface AddEventComponentProps {
    authStatus: AuthStatus;
    history: History;
    user: FrontEndUser | undefined;
    children?: JSX.Element;

    addEvent(payload: { event: Event, userId: number }): void;
}
