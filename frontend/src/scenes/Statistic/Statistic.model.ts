import { AuthStatus } from 'models';
import { StatisticState } from './../../store/statistic/interfaces';

export interface StatisticProps {
  status: AuthStatus;
  history: any;
  statistic: StatisticState;
  logoutUser(): void;
  initBestUsers(): void;
  initMostPopularGames(): void;
  initRecentGames(): void;
}
