import { BattleStatus } from 'models';

export interface BattleState {
  status: BattleStatus;
  roomURL: string;
  battleName: string;
  countdown: number;
}
