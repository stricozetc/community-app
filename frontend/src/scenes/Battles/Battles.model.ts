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
  roomsInfo: RoomInfo[];
  games: GameModel[];
  status: LoadStatus;
  children?: JSX.Element;

  joinBattleAction(payload: string): void;

  logoutUser(): void;

  initGames(): void;
}
