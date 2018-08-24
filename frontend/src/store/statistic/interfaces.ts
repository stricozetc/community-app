import { Leaders, LoadStatus } from 'models';

export interface StatisticState {
  bestUsers: any[];
  mostPopularGames: any[];
  recentGames: any[];
  leaders: Leaders[];
  bestUsersStatus: LoadStatus;
  mostPopularGamesStatus: LoadStatus;
  recentGamesStatus: LoadStatus;
  leadersStatus: LoadStatus;
}
