import { History } from 'history';

import { RoomInfo } from 'models';

export interface CurrentBattleProps {
  rooms: RoomInfo[];
  currentPlayerRoom: RoomInfo | undefined;
  history: History;
  gameStatus: number;
  authStatus: number;
  leaveBattleAction(payload: string): void;
  logoutUser(): void;
}
