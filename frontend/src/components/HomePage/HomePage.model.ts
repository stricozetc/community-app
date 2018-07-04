import { AuthStatus, BattleStatus } from 'models';

import { Game } from 'components/GameCard';

export interface HomePageProps {
  status: AuthStatus;
  battleStatus: BattleStatus;
  history: any;
  waitBattlePlayersCountAction: number;
  fetchingData: boolean;
  games: Game[];
  joinBattleAction(): any;
  leaveBattleAction(): any;
  logoutUser(): void;
  initGames(): void;
}
