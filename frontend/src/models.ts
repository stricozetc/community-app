export interface Item {
  id: string;
  name: string;
}

export enum BattleStatus{
  INIT,
  WAIT,
  PLAY
}