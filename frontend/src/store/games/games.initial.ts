import { LoadStatus } from 'models';

import { GamesState } from './interfaces';

type State = GamesState;

export const initialState: State = {
  games: [],
  gamesStatus: LoadStatus.Init
};
