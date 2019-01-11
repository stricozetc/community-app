import { History } from 'history';
import { FrontEndUser } from 'store';

import {
  AuthStatus,
  ErrorBlock,
  SnackbarType,
} from 'models';

export interface RootProps {
  status: AuthStatus;
  user: FrontEndUser | undefined;
  history: History;
  isSnackbarOpen: boolean;
  snackbarType: SnackbarType;
  errors: ErrorBlock[];
  language?: string;

  logoutUser(): void;

  closeSnackbar(): void;

  changeLanguage(language: string): void;
}
