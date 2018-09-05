import { History } from 'history';

import {
  AuthStatus,
  BattleStatus,
  GameModel,
  LoadStatus,
  RoomInfo
} from 'models';

export interface BattleProps {

  authStatus: AuthStatus;
  battleStatus: BattleStatus;
  history: History;
  gameId: number | undefined;
  rooms: RoomInfo[];
  games: GameModel[];
  status: LoadStatus;
  children?: JSX.Element;

  joinRoom(payload: string): void;

  logoutUser(): void;

  initGames(): void;

  leaveBattleAction(payload: string): void;
}
