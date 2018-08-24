import { LoadStatus } from 'models';

import { StatisticState } from './interfaces';

type State = StatisticState;

export const initialState: State = {
  bestUsers: [],
  mostPopularGames: [],
  recentGames: [],
  leaders: [],
  bestUsersStatus: LoadStatus.Init,
  mostPopularGamesStatus: LoadStatus.Init,
  recentGamesStatus: LoadStatus.Init,
  leadersStatus: LoadStatus.Init
};
