import { StatisticState } from './interfaces';
import { LoadStatus } from 'models';

type State = StatisticState;

export const initialState: State = {
  bestUsers: [],
  mostPopularGames: [],
  recentGames: [],
  bestUsersStatus: LoadStatus.INIT,
  mostPopularGamesStatus: LoadStatus.INIT,
  recentGamesStatus: LoadStatus.INIT
};
