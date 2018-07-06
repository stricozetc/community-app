import { BattleStatus, QuestInfo } from 'models';

export interface GameCardProps {
  game: QuestInfo;
  status: BattleStatus;
  battleStatus: BattleStatus;
  waitBattlePlayersCountAction: number;

  joinGame($event: any): any;

  leaveGame($event: any): any;
}
