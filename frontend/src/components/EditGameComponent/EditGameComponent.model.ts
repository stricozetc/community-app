import { History } from 'history';
import { AuthStatus, GameModel } from 'models';
import { FrontEndUser } from 'store';

export interface EditGameComponentProps {
    authStatus: AuthStatus;
    history: History;
    user: FrontEndUser | undefined;
    games: GameModel[];
    children?: JSX.Element;
    match: { params: string};

    editGame(payload: GameModel): void;
}
