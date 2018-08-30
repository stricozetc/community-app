import { History } from 'history';

import { RoomInfo } from 'models';

export interface CurrentBattleProps {
  roomsInfo: RoomInfo[];
  history: History;
  gameStatus: number;
  authStatus: number;
  roomId: number | undefined;
  leaveBattleAction(payload: string): void;
  logoutUser(): void;
}
