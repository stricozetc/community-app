import { History } from 'history';
import { FrontEndUser } from 'store';

import {
  AuthStatus,
  RoomInfo,
  SnackbarType,
} from 'models';

export interface RootProps {
  status: AuthStatus;
  user: FrontEndUser | undefined;
  history: History;
  roomId: number | undefined;
  isSnackbarOpen: boolean;
  snackbarType: SnackbarType;
  errors: any;
  language?: string;
  roomsInfo: RoomInfo[];

  leaveBattle(battleName: string): void;

  logoutUser(): void;

  cleanStatistic(): void;

  closeSnackbar(): void;

  changeLanguage(language: string): void;
}
