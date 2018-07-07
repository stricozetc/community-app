import { action } from '../decorators';
import { Game } from "models";

export enum GamesTypes {
  InitGames = '[games] Init Games',
  GamesInited = '[games] Games Inited',
}

@action()
export class InitGames {
  public readonly type = GamesTypes.InitGames;
}

@action()
export class GamesInited {
  public readonly type = GamesTypes.GamesInited;

  public constructor(public payload: Game[]) {
  }
}

export type QuestsActions =
  | GamesInited
  | InitGames ;
