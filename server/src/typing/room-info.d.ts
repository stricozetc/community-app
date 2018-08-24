import { RoomStatus } from 'service/room/models/room-status';

export interface RoomInfo {
  id: number;
  gameId: number;
  maxPlayersCount: number;
  playersCount: number;
  status: RoomStatus;
  distance?: number;
}
