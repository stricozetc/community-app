import { AuthStatus } from 'models';
import { FrontEndUser } from 'store';
import { StatisticState } from 'store/statistic';

export interface StatisticProps {
  authStatus: AuthStatus;
  history: any;
  user: FrontEndUser;
  statistic: StatisticState;
  logoutUser(): void;
  initBestUsers(): void;
  initMostPopularGames(): void;
  initRecentGames(userToken: string): void;
}
