import { LoadStatus, GameModel } from 'models';

export interface GamesState {
  games: GameModel[];
  gamesStatus: LoadStatus;
}
