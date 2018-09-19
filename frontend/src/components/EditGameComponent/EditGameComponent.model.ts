import { History } from 'history';
import { AuthStatus, GameModel } from 'models';
import { match } from 'react-router';
import { FrontEndUser } from 'store';

export interface EditGameComponentProps {
    authStatus: AuthStatus;
    history: History;
    user: FrontEndUser | undefined;
    games: GameModel[];
    children?: JSX.Element;
    match: match<number>;

    editGame(payload: GameModel): void;
}
