import { History } from 'history';
import { AuthStatus } from 'models';
import { match } from 'react-router';
import { FrontEndUser } from 'store';
import { StatisticState } from 'store/statistic';

export interface StatisticProps {
  authStatus: AuthStatus;
  history: History;
  user: FrontEndUser;
  statistic: StatisticState;
  match: match<string>;
  logoutUser(): void;
  initLeaders(appName: string): void;
}
