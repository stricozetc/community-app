import { ErrorsFromServer, GameModel } from 'models';

import { action } from '../decorators';

export enum MyGamesActionTypes {
    EditGame = '[my-games] Edit Game',
    EditGameSuccess = '[my-games] Edit Game (Success)',
    EditGameError = '[my-games] Edit Game (Error)',
    DeleteGame = '[my-games] Delete Game',
    DeleteGameSuccess = '[my-games] Delete Game (Success)',
    DeleteGameError = '[my-games] Delete Game (Error)',
    AddGame = '[my-games] Add Game',
    AddGameSuccess = '[my-games] Add Game (Success)',
    AddGameError = '[my-games] Add Game (Error)',
    InitMyGames = '[my-games] Init My Games',
    LoadMyGamesSuccess = '[my-games] Load My Games (Success)',
    LoadMyGamesError = '[my-games] Load My Games (Error)'
}

@action()
export class EditGame {
  public readonly type = MyGamesActionTypes.EditGame;

  public constructor(public payload: GameModel) {}
}

@action()
export class EditGameSuccess {
  public readonly type = MyGamesActionTypes.EditGameSuccess;

  public constructor(public payload: GameModel[]) {}
}

@action()
export class EditGameError {
  public readonly type = MyGamesActionTypes.EditGameError;
}

@action()
export class DeleteGame {
  public readonly type = MyGamesActionTypes.DeleteGame;

  public constructor(public payload: GameModel) {}
}

@action()
export class DeleteGameSuccess {
  public readonly type = MyGamesActionTypes.DeleteGameSuccess;

  public constructor(public payload: GameModel[]) {}
}

@action()
export class DeleteGameError {
  public readonly type = MyGamesActionTypes.DeleteGameError;
}

@action()
export class AddGame {
  public readonly type = MyGamesActionTypes.AddGame;

  public constructor(public payload: GameModel) {}
}

@action()
export class AddGameSuccess {
  public readonly type = MyGamesActionTypes.AddGameSuccess;

  public constructor(public payload: GameModel) {}
}

@action()
export class AddGameError {
  public readonly type = MyGamesActionTypes.AddGameError;
}

@action()
export class InitMyGames {
  public readonly type = MyGamesActionTypes.InitMyGames;

  public constructor(public payload: number) {}
}

@action()
export class LoadMyGamesSuccess {
  public readonly type = MyGamesActionTypes.LoadMyGamesSuccess;

  public constructor(public payload: GameModel[]) {}
}

@action()
export class LoadMyGamesError {
  public readonly type = MyGamesActionTypes.LoadMyGamesError;

  public constructor(public payload: ErrorsFromServer) {}
}

export type MyGameActions =
  | EditGame
  | EditGameSuccess
  | EditGameError
  | DeleteGame
  | DeleteGameSuccess
  | DeleteGameError
  | AddGame
  | AddGameSuccess
  | AddGameError
  | InitMyGames
  | LoadMyGamesSuccess
  | LoadMyGamesError;
