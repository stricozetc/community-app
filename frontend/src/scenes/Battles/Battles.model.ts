import { AuthStatus, BattleStatus, GameModel, LoadStatus, RoomInfo } from 'models';

export interface BattleProps {

  authStatus: AuthStatus;
  battleStatus: BattleStatus;
  history: any;
  roomsInfo: RoomInfo[];
  games: GameModel[];
  status: LoadStatus;
  children?: JSX.Element;
  /* isSnackbarOpen: boolean; */

  joinBattleAction(payload: string): any;

  leaveBattleAction(payload: string): any;

  logoutUser(): void;

  initGames(): void;

  /* closeSnackbar(): void;

  openSnackbar(): void; */
}
