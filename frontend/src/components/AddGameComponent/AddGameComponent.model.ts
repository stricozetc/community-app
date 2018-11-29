import { History } from 'history';
import { AuthStatus, GameModel } from 'models';
import { FrontEndUser } from 'store';

export interface AddGameComponentProps {
    authStatus: AuthStatus;
    history: History;
    user: FrontEndUser | undefined;
    children?: JSX.Element;

    addGame(payload: GameModel): void;
}
