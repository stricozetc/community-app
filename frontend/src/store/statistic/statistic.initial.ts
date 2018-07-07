import { StatisticState } from './interfaces';

type State = StatisticState;

export const initialState: State = {
  bestUsers: [],
  mostPopularGames: [],
  recentGames: [],
  bestUsersInited: false,
  mostPopularGamesInited: false,
  recentGamesInited: false
};
