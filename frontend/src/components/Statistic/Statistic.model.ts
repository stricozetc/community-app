import { AuthStatus } from 'models';

export interface StatisticProps {
  status: AuthStatus;
  history: any;
  logoutUser(): void;
}
