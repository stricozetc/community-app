import { AuthStatus, BattleStatus, LoadStatus, MyGameModel, RoomInfo } from 'models';

export interface BattleProps {

  authStatus: AuthStatus;
  battleStatus: BattleStatus;
  history: any;
  roomsInfo: RoomInfo[];
  games: MyGameModel[];
  status: LoadStatus;
  children?: JSX.Element;
  isSnackbarOpen: boolean;

  joinBattleAction(payload: string): any;

  leaveBattleAction(payload: string): any;

  logoutUser(): void;

  initGames(): void;

  closeSnackbar(): void;

  openSnackbar(): void;
}
