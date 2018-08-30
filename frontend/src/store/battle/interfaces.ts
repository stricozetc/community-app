import { BattleStatus } from 'models';

export interface BattleState {
  status: BattleStatus;
  roomId: number | undefined;
  gameId: number | undefined;
}
