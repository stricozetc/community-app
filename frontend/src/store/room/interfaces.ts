import { BattleStatus, RoomInfo } from 'models';

export interface RoomState {
  rooms: RoomInfo[];
  currentPlayerRoom: RoomInfo | undefined;
  currentGameId: number | undefined;
  battleStatus: BattleStatus;
}
