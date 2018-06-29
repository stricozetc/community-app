import { BattleStatus } from 'models';

export interface GameNamePair {
  frontName: string;
  backName: string;
}

export interface GameCardProps {
  game: Game;
  status: BattleStatus;
  modificators?: string[];
  gameCardFooter?: JSX.Element;
  joinGame(): any;
  leaveGame(): any;
}

export interface Game {
  name: string;
  desc: string;
  timeToStart: string;
  maxPlayersInRoom: number;
  isStarted: boolean;
}
