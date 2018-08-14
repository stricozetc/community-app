import { AuthStatus, MyGameModel } from 'models';

export interface AddGameComponentProps {
    authStatus: AuthStatus;
    history: any;
    user: any;
    games: MyGameModel[];
    children?: JSX.Element;

    addGame (payload: MyGameModel): void;
}
