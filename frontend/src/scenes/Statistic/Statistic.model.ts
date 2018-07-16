import { AuthStatus } from 'models';
import { StatisticState } from './../../store/statistic/interfaces';


export interface StatisticProps {
  authStatus: AuthStatus;
  history: any;
  // bestUsersStatus: LoadStatus;
  // recentGamesStatus: LoadStatus;
  // mostPopularGamesStatus: LoadStatus;
  statistic: StatisticState;
  isSnackbarOpen: boolean;
  logoutUser(): void;
  initBestUsers(): void;
  initMostPopularGames(): void;
  initRecentGames(): void;
  closeSnackbar(): void;
  openSnackbar(): void;
}
