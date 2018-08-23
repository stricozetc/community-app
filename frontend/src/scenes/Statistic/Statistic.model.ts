import { History } from 'history';

import { AuthStatus } from 'models';
import { FrontEndUser, StatisticState } from 'store';

export interface StatisticProps {
  authStatus: AuthStatus;
  history: History;
  user: FrontEndUser;
  statistic: StatisticState;
  logoutUser(): void;
  initBestUsers(): void;
  initMostPopularGames(): void;
  initRecentGames(userToken: string): void;
}
