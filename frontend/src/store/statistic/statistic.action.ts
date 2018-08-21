import { ErrorsFromServer } from 'models';

import { action } from '../decorators';

export enum StatisticTypes {
  InitBestUsers = '[statistic] Init Best Users',
  LoadBestUsersCompleted = '[statistic] Load Best Users Completed',
  LoadBestUsersError = '[statistics] Load Best Users Completed',
  InitMostPopularGames = '[statistic] Init Most Popular Games',
  LoadMostPopularGamesCompleted = '[statistic] Load Most Popular Games Completed',
  LoadMostPopularGamesError = '[statistics] Load Most Popular Games Failed',
  InitRecentGames = '[statistic] Init Recent Games',
  LoadRecentGamesCompleted = '[statistic] Load Recent Games Completed',
  LoadRecentGamesError = '[statistic] Load Recent Games Failed',
  CleanStatistic = '[statistic] Clean Statistic'
}

@action()
export class InitBestUsers {
  public readonly type = StatisticTypes.InitBestUsers;
}

@action()
export class LoadBestUsersCompleted {
  public readonly type = StatisticTypes.LoadBestUsersCompleted;

  constructor(public payload: any[]) { }
}

@action()
export class LoadBestUsersError {
  public readonly type = StatisticTypes.LoadBestUsersError;

  constructor(public err: ErrorsFromServer) { }
}

@action()
export class InitMostPopularGames {
  public readonly type = StatisticTypes.InitMostPopularGames;
}

@action()
export class LoadMostPopularGamesCompleted {
  public readonly type = StatisticTypes.LoadMostPopularGamesCompleted;

  constructor(public payload: any[]) { }
}

@action()
export class LoadMostPopularGamesError {
  public readonly type = StatisticTypes.LoadMostPopularGamesError;

  constructor(public err: ErrorsFromServer) { }
}

@action()
export class InitRecentGames {
  public readonly type = StatisticTypes.InitRecentGames;

  constructor(public userToken: string) { }
}

@action()
export class LoadRecentGamesCompleted {
  public readonly type = StatisticTypes.LoadRecentGamesCompleted;

  constructor(public payload: any[]) { }
}

@action()
export class LoadRecentGamesError {
  public readonly type = StatisticTypes.LoadRecentGamesError;

  constructor(public err: ErrorsFromServer) { }
}

@action()
export class CleanStatistic {
  public readonly type = StatisticTypes.CleanStatistic;
}

export type StatisticAction =
  | InitBestUsers
  | LoadBestUsersCompleted
  | LoadBestUsersError
  | InitMostPopularGames
  | LoadMostPopularGamesCompleted
  | LoadMostPopularGamesError
  | InitRecentGames
  | LoadRecentGamesCompleted
  | LoadRecentGamesError
  | CleanStatistic;
