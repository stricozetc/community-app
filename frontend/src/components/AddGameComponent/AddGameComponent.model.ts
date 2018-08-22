import { AuthStatus, GameModel } from 'models';

export interface AddGameComponentProps {
    authStatus: AuthStatus;
    history: any;
    user: any;
    children?: JSX.Element;

    logoutUser: () => void;
    addGame(payload: GameModel): void;
}
