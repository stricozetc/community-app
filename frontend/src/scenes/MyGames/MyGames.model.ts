import { AuthStatus, MyGameModel } from 'models';
export interface MyGameProps {
    authStatus: AuthStatus;
    history: any;
    user: any;
    games: MyGameModel[];
    children?: JSX.Element;

    deleteGame (payload: MyGameModel | null): void;
    addGame (payload: MyGameModel):  void;
    getMyGames (payload: number):  void;
}

export interface  MyGameState {
    isDialogOpen: boolean;
    deletedGame: MyGameModel | null;
}
