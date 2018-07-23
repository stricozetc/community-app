
import { LoadStatus } from 'models';

export interface StatisticState {
  bestUsers: any[],
  mostPopularGames: any[],
  recentGames: any[],
  bestUsersStatus: LoadStatus
  mostPopularGamesStatus: LoadStatus,
  recentGamesStatus: LoadStatus
}