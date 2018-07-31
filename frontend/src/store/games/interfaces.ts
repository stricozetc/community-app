import { Game, LoadStatus } from 'models';

export interface GamesState {
  games: Game[];
  gamesStatus: LoadStatus;
}
