import { LoadStatus, MyGameModel } from 'models';

export interface GamesState {
  games: MyGameModel[];
  gamesStatus: LoadStatus;
}
