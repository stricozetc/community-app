import { AuthStatus, GameModel } from 'models';
export interface MyGameProps {
    authStatus: AuthStatus;
    history: any;
    user: any;
    games: GameModel[];
    children?: JSX.Element;

    deleteGame (payload: GameModel | null): void;
    addGame (payload: GameModel):  void;
    getMyGames (payload: number):  void;
}

export interface  MyGameState {
    isDialogOpen: boolean;
    deletedGame: GameModel | null;
}
