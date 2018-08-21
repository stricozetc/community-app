import { AuthStatus, SnackbarType } from 'models';
import { History } from 'history';
import { FrontEndUser } from 'store';

export interface RootProps {
  status: AuthStatus;
  user: FrontEndUser  | undefined;
  history: History;
  battleName: string;
  isSnackbarOpen: boolean;
  snackbarType: SnackbarType;
  errors: any;
  language?: string;

  leaveBattle(battleName: string): void;

  logoutUser(): void;

  cleanStatistic(): void;

  closeSnackbar(): void,

  changeLanguage(language: string): void;
}
