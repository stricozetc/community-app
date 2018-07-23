import { BattleStatus, RoomInfo } from 'models';

export interface BattleState {
  status: BattleStatus;
  roomsInfo: RoomInfo[];
  roomURL: string;
  battleName: string;
  countdown: number;
}
