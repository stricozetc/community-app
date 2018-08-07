import { ErrorsFromServer } from '../../models';
import { action } from '../decorators';

import { MyGameModel } from './interfaces';

export enum MyGamesActionTypes {
    EditGame = '[my-games] Edit Game',
    EditGameCompleted = '[my-games] Edit Game Completed',
    EditGameFailed = '[my-games] Edit Game Failed',
    DeleteGame = '[my-games] Delete Game',
    DeleteGameCompleted = '[my-games] Delete Game Completed',
    DeleteGameFailed = '[my-games] Delete Game Failed',
    AddGame = '[my-games] Add Game',
    AddGameCompleted = '[my-games] Add Game Completed',
    AddGameFailed = '[my-games] Add Game Failed',
    InitMyGames = '[my-games] Init My Games',
    LoadMyGamesCompleted = '[my-games] Load My Games Completed',
    LoadMyGamesFailed = '[my-games] Load My Games Failed'
}

@action()
export class EditGame {
  public readonly type = MyGamesActionTypes.EditGame;

  public constructor(public payload: MyGameModel) {}
}

@action()
export class EditGameCompleted {
  public readonly type = MyGamesActionTypes.EditGameCompleted;

  public constructor(public payload: MyGameModel[]) {}
}

@action()
export class EditGameFailed {
  public readonly type = MyGamesActionTypes.EditGameFailed;

  public constructor(public payload: object) {}
}

@action()
export class DeleteGame {
  public readonly type = MyGamesActionTypes.DeleteGame;

  public constructor(public payload: MyGameModel) {}
}

@action()
export class DeleteGameCompleted {
  public readonly type = MyGamesActionTypes.DeleteGameCompleted;

  public constructor(public payload: MyGameModel[]) {}
}

@action()
export class DeleteGameFailed {
  public readonly type = MyGamesActionTypes.DeleteGameFailed;

  public constructor(public payload: object) {}
}

@action()
export class AddGame {
  public readonly type = MyGamesActionTypes.AddGame;

  public constructor(public payload: MyGameModel) {}
}

@action()
export class AddGameCompleted {
  public readonly type = MyGamesActionTypes.AddGameCompleted;

  public constructor(public payload: MyGameModel) {}
}

@action()
export class AddGameFailed {
  public readonly type = MyGamesActionTypes.AddGameFailed;

  public constructor(public payload: object) {}
}

@action()
export class InitMyGames {
  public readonly type = MyGamesActionTypes.InitMyGames;

  public constructor(public payload: number) {}
}

@action()
export class LoadMyGamesCompleted {
  public readonly type = MyGamesActionTypes.LoadMyGamesCompleted;

  public constructor(public payload: MyGameModel[]) {}
}

@action()
export class LoadMyGamesFailed {
  public readonly type = MyGamesActionTypes.LoadMyGamesFailed;

  public constructor(public payload: ErrorsFromServer) {}
}

export type MyGameActions =
  | EditGame
  | EditGameCompleted
  | EditGameFailed
  | DeleteGame
  | DeleteGameCompleted
  | DeleteGameFailed
  | AddGame
  | AddGameCompleted
  | AddGameFailed
  | InitMyGames
  | LoadMyGamesCompleted
  | LoadMyGamesFailed;
