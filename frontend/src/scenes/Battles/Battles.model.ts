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

  joinBattleAction(payload: string): void;

  leaveBattleAction(payload: string): void;

  logoutUser(): void;

  initGames(): void;

  /* closeSnackbar(): void;

  openSnackbar(): void; */
}
