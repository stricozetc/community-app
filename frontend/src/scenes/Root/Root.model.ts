import { History } from 'history';
import { FrontEndUser } from 'store';

import {
  AuthStatus,
  ErrorBlock,
  RoomInfo,
  SnackbarType,
} from 'models';

export interface RootProps {
  status: AuthStatus;
  user: FrontEndUser | undefined;
  history: History;
  currentPlayerRoom: RoomInfo | undefined;
  isSnackbarOpen: boolean;
  snackbarType: SnackbarType;
  errors: ErrorBlock[];
  language?: string;

  leaveRoom(battleName: string): void;

  logoutUser(): void;

  cleanStatistic(): void;

  closeSnackbar(): void;

  changeLanguage(language: string): void;
}
