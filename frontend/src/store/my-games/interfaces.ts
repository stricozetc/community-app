import { GameModel, LoadStatus } from 'models';

export interface MyGamesState {
    myGames: GameModel[];
    myGamesStatus: LoadStatus;
    editGameStatus: LoadStatus;
    deleteGameStatus: LoadStatus;
    addGameStatus: LoadStatus;
}
