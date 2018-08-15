import { GameModel } from 'models';

import { action } from '../decorators';

export enum GamesTypes {
  LoadGames = '[games] Load Games',
  LoadGamesSuccess = '[games] Load Games (Success)',
  LoadGamesError = '[games] Load Games (Error)',
}

@action()
export class LoadGames {
  public readonly type = GamesTypes.LoadGames;
}

@action()
export class LoadGamesSuccess {
  public readonly type = GamesTypes.LoadGamesSuccess;

  public constructor(public payload: GameModel[]) { }
}

@action()
export class LoadGamesError {
  public readonly type = GamesTypes.LoadGamesError;
}

export type GamesActions =
  | LoadGamesSuccess
  | LoadGames
  | LoadGamesError;
