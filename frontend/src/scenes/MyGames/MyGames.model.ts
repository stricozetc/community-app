import { AuthStatus, MyGameModel } from 'models';
export interface MyGameProps {
    authStatus: AuthStatus;
    history: any;
    user: any;
    games: MyGameModel[];
    children?: JSX.Element;

    deleteGame (payload: MyGameModel | null): any;
    addGame (payload: MyGameModel):  any;
    getMyGames (payload: number):  any;
}

export interface  MyGameState {
    isDialogOpen: boolean;
    deletedGame: MyGameModel | null;
}
