import { RoomStatus } from './room-status';

export interface Room {
  id: number;
  gameId: number;
  maxPlayersCount: number;
  players: SocketIO.Socket[];
  token: string;
  status: RoomStatus;
  timer?: any;
  distance?: number;
}
