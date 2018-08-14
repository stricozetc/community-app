import { BattleStatus, MyGameModel } from 'models';

export interface GameCardProps {
  game: MyGameModel;
  status: BattleStatus;
  battleStatus: BattleStatus;
  waitBattlePlayersCountAction: number;
  isFull?: boolean;
  battleStartTime: Date;

  joinGame($event: any): any;

  leaveGame($event: any): any;
}
