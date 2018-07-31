import { Game } from 'models';

import { action } from '../decorators';

export enum GamesTypes {
  InitGames = '[game] Init Game',
  LoadGamesCompleted = '[game] Load Games Completed',
  LoadGamesFailed = '[game] Load Games Failed',
}

@action()
export class InitGames {
  public readonly type = GamesTypes.InitGames;
}

@action()
export class LoadGamesCompleted {
  public readonly type = GamesTypes.LoadGamesCompleted;

  public constructor(public payload: Game[]) { }
}

@action()
export class LoadGamesFailed {
  public readonly type = GamesTypes.LoadGamesFailed;
}

export type GamesActions =
  | LoadGamesCompleted
  | InitGames
  | LoadGamesFailed;
