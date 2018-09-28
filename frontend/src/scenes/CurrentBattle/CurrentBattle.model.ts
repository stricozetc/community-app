import { History } from 'history';

import { BattleStatus, RoomInfo } from 'models';

export interface CurrentBattleProps {
  battleStatus: BattleStatus;
  rooms: RoomInfo[];
  currentPlayerRoom: RoomInfo | undefined;
  history: History;
  gameStatus: number;
  authStatus: number;
  leaveBattleAction(payload: string): void;
  logoutUser(): void;
}
