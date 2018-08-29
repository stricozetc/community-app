import { BestUser, Leaders, LoadStatus, MostPopularGames, RecentGames } from 'models';

export interface StatisticState {
  bestUsers: BestUser[];
  mostPopularGames: MostPopularGames[];
  recentGames: RecentGames[];
  leaders: Leaders[];
  bestUsersStatus: LoadStatus;
  mostPopularGamesStatus: LoadStatus;
  recentGamesStatus: LoadStatus;
  leadersStatus: LoadStatus;
}
