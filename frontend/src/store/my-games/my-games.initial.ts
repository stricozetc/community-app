import { LoadStatus } from 'models';

import { MyGamesState } from './interfaces';

type State = MyGamesState;

export const initialState: State = {
    myGames: [],

    myGamesStatus: LoadStatus.INIT,
    editGameStatus: LoadStatus.INIT,
    deleteGameStatus: LoadStatus.INIT,
    addGameStatus: LoadStatus.INIT
};
