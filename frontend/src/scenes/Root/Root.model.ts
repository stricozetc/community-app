import { AuthStatus, SnackbarType, ErrorsFromServer } from 'models';

export interface RootProps {
  status: AuthStatus;
  user: FrontEndUser  | undefined;
  history: any;
  battleName: string;
  isSnackbarOpen: boolean;
  snackbarType: SnackbarType;
  errors: any;
  language: string;

  leaveBattle(battleName: string): void;

  logoutUser(): void;

  cleanStatistic(): void;

  closeSnackbar(): void,
  changeLanguage(language: string): void;
}
