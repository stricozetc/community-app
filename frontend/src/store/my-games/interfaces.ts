import { LoadStatus, MyGameModel} from 'models';

export interface MyGamesState {
    myGames: MyGameModel[];
    myGamesStatus: LoadStatus;
    editGameStatus: LoadStatus;
    deleteGameStatus: LoadStatus;
    addGameStatus: LoadStatus;
}