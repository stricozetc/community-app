import { GamesState } from './interfaces';
import { LoadStatus } from 'models';

type State = GamesState;

export const initialState: State = {
   games: [],
   gamesStatus: LoadStatus.INIT
};
