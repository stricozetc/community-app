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
  roomsInfo: RoomInfo[];
  games: GameModel[];
  status: LoadStatus;
  children?: JSX.Element;

  joinBattleAction(payload: string): void;

  leaveBattleAction(payload: string): void;

  logoutUser(): void;

  initGames(): void;
}
