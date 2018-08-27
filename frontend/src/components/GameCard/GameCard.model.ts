import { BattleStatus, GameModel } from 'models';

export interface GameCardProps {
  game: GameModel;
  status: BattleStatus;
  battleStatus: BattleStatus;
  waitBattlePlayersCountAction: number;
  isFull?: boolean;
  battleStartTime: Date;

  joinGame($event: string): void;

  leaveGame($event: string): void;
}
