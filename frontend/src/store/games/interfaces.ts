import { Game } from 'models';
import { LoadStatus } from 'models';

export interface GamesState {
  games: Game[];
  gamesStatus: LoadStatus;
}
