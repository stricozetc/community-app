import { BattleStatus, Game, LoadStatus, AuthStatus } from 'models';


 export interface BattleProps {

  authStatus:AuthStatus;
  battleStatus: BattleStatus;
  history: any;
  waitBattlePlayersCountAction: number;
  games: Game[];
  status: LoadStatus;
  children?: JSX.Element;
  isSnackbarOpen: boolean;

  joinBattleAction(payload: string): any;

  leaveBattleAction(payload: string): any;

  logoutUser(): void;

  initGames(): void;

  closeSnackbar(): void;

  openSnackbar():void;
}

