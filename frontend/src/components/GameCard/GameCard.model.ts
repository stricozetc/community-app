import { BattleStatus } from 'models';

export interface GameNamePair {
  frontName: string;
  backName: string;
}

export interface GameCardProps {
  game: Game;
  status: BattleStatus;
  // conditionalStyles?: string[];
  // gameCardFooter?: JSX.Element;
  battleStatus: BattleStatus;
  waitBattlePlayersCountAction: number;
  joinGame($event: any): any;
  leaveGame($event: any): any;
}

export interface Game {
  name: string;
  desc: string;
  timeToStart: string;
  maxPlayersInRoom: number;
  isStarted: boolean;
}
