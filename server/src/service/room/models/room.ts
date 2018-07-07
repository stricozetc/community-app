import { RoomStatus } from './room-status';

export interface Room {
    id: number;
    maxPlayersCount: number;
    players: SocketIO.Socket[];
    token: string;
    status: RoomStatus;
    timer?: any;
    distance?: number;
}
