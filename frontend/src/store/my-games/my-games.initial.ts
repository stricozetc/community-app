import { LoadStatus } from 'models';

import { MyGamesState } from './interfaces';

type State = MyGamesState;

export const initialState: State = {
    myGames: [],
    myGamesStatus: LoadStatus.Init,
    editGameStatus: LoadStatus.Init,
    deleteGameStatus: LoadStatus.Init,
    addGameStatus: LoadStatus.Init
};
