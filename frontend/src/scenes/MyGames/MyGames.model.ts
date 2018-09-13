import { History } from 'history';

import { AuthStatus, GameModel } from 'models';
import { FrontEndUser } from 'store';

export interface MyGameProps {
    authStatus: AuthStatus;
    history: History;
    user: FrontEndUser | undefined;
    games: GameModel[];
    children?: JSX.Element;

    deleteGame(payload: GameModel | null): void;
    addGame(payload: GameModel): void;
    getMyGames(payload: number): void;
    successCopyToken(): void;

}

export interface MyGameState {
    isDialogOpen: boolean;
    isPopoverOpen: boolean;
    deletedGame: GameModel | null;
    appTokenInPopover: string;
}
