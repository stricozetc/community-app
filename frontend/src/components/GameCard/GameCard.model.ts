import { BattleStatus, Game } from 'models';

export interface GameCardProps {
  game: Game;
  status: BattleStatus;
  battleStatus: BattleStatus;
  waitBattlePlayersCountAction: number;
  isFull?: boolean;
  battleStartTime: Date;

  joinGame($event: any): any;

  leaveGame($event: any): any;
}
