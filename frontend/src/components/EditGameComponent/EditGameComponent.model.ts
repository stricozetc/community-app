import { AuthStatus, MyGameModel } from 'models';

export interface EditGameComponentProps {
    authStatus: AuthStatus;
    history: any;
    user: any;
    games: MyGameModel[];
    children?: JSX.Element;
    match: any;

    editGame (payload: MyGameModel): void;
}
