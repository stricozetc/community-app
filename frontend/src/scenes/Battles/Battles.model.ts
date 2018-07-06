import { AuthStatus, BattleStatus, QuestInfo } from 'models';

export interface BattleProps {
  status: AuthStatus;
  battleStatus: BattleStatus;
  history: any;
  waitBattlePlayersCountAction: number;
  fetchingData: boolean;
  quests: QuestInfo[];
  children?: JSX.Element;

  joinBattleAction(payload: string): any;

  leaveBattleAction(payload: string): any;

  logoutUser(): void;

  initGames(): void;
}
