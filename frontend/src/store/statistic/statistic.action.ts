import { ErrorsFromServer } from 'models';

import { action } from '../decorators';

export enum StatisticTypes {
  InitBestUsers = '[statistic] Init Best Users',
  LoadBestUsersCompleted = '[statistic] Load Best Users Completed',
  LoadBestUsersFailed = '[statistics] Load Best Users Completed',
  InitMostPopularGames = '[statistic] Init Most Popular Games',
  LoadMostPopularGamesCompleted = '[statistic] Load Most Popular Games Completed',
  LoadMostPopularGamesFailed = '[statistics] Load Most Popular Games Failed',
  InitRecentGames = '[statistic] Init Recent Games',
  LoadRecentGamesCompleted = '[statistic] Load Recent Games Completed',
  LoadRecentGamesFailed = '[statistic] Load Recent Games Failed',
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
export class LoadBestUsersFailed {
  public readonly type = StatisticTypes.LoadBestUsersFailed;

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
export class LoadMostPopularGamesFailed {
  public readonly type = StatisticTypes.LoadMostPopularGamesFailed;

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
export class LoadRecentGamesFailed {
  public readonly type = StatisticTypes.LoadRecentGamesFailed;

  constructor(public err: ErrorsFromServer) { }
}

@action()
export class CleanStatistic {
  public readonly type = StatisticTypes.CleanStatistic;
}

export type StatisticAction =
  | InitBestUsers
  | LoadBestUsersCompleted
  | LoadBestUsersFailed
  | InitMostPopularGames
  | LoadMostPopularGamesCompleted
  | LoadMostPopularGamesFailed
  | InitRecentGames
  | LoadRecentGamesCompleted
  | LoadRecentGamesFailed
  | CleanStatistic;
