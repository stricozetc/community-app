import { LoadStatus } from 'models';

import { StatisticState } from './interfaces';

type State = StatisticState;

export const initialState: State = {
  bestUsers: [],
  mostPopularGames: [],
  recentGames: [],
  bestUsersStatus: LoadStatus.INIT,
  mostPopularGamesStatus: LoadStatus.INIT,
  recentGamesStatus: LoadStatus.INIT,
};
