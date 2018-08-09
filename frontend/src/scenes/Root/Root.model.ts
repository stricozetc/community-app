import { FrontEndUser } from 'store';

import { AuthStatus, ErrorsFromServer } from 'models';

export interface RootProps {
  status: AuthStatus;
  user: FrontEndUser  | undefined;
  history: any;
  battleName: string;
  isSnackbarOpen: boolean;
  errors: ErrorsFromServer

  leaveBattle(battleName: string): void;

  logoutUser(): void;

  cleanStatistic(): void;

  closeSnackbar(): void;

  openSnackbar(): void;
} 
  