import { GameModel, LoadStatus } from 'models';

export interface GamesState {
  games: GameModel[];
  gamesStatus: LoadStatus;
}
