import { BattleStatus } from 'models';

export interface BattleRegistrationProps {
  status: BattleStatus;
  waitBattlePlayersCountAction: number;
  countdown: number;
  joinBattleAction(name: string): void;
  leaveBattleAction(name: string): void;
}
