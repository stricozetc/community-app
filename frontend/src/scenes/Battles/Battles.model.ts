import { AuthStatus, BattleStatus, Game } from 'models';

export interface BattleProps {
  status: AuthStatus;
  battleStatus: BattleStatus;
  history: any;
  waitBattlePlayersCountAction: number;
  fetchingData: boolean;
  games: Game[];
  children?: JSX.Element;

  joinBattleAction(payload: string): any;

  leaveBattleAction(payload: string): any;

  logoutUser(): void;

  initGames(): void;
}
