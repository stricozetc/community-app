import { AuthStatus, GameModel } from 'models';

export interface EditGameComponentProps {
    authStatus: AuthStatus;
    history: any;
    user: any;
    games: GameModel[];
    children?: JSX.Element;
    match: any;

    editGame (payload: GameModel): void;
}
