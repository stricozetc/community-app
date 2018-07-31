import { AuthStatus } from 'models';
import { FrontEndUser } from 'store';
import { StatisticState } from 'store/statistic';

export interface StatisticProps {
  authStatus: AuthStatus;
  history: any;
  user: FrontEndUser;
  // bestUsersStatus: LoadStatus;
  // recentGamesStatus: LoadStatus;
  // mostPopularGamesStatus: LoadStatus;
  statistic: StatisticState;
  isSnackbarOpen: boolean;
  logoutUser(): void;
  initBestUsers(): void;
  initMostPopularGames(): void;
  initRecentGames(userToken: string): void;
  closeSnackbar(): void;
  openSnackbar(): void;
}
