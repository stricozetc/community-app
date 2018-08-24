import {  BestUser, Leaders, MostPopularGames, RecentGames } from 'models';

import { action } from '../decorators';

export enum StatisticTypes {
  InitBestUsers = '[statistic] Init Best Users',
  LoadBestUsersSuccess = '[statistic] Load Best Users (Success)',
  LoadBestUsersError = '[statistics] Load Best Users (Error)',
  InitMostPopularGames = '[statistic] Init Most Popular Games',
  LoadMostPopularGamesSuccess = '[statistic] Load Most Popular Games(Success)',
  LoadMostPopularGamesError = '[statistics] Load Most Popular Games (Error)',
  InitRecentGames = '[statistic] Init Recent Games',
  LoadRecentGamesSuccess = '[statistic] Load Recent Games (Success)',
  LoadRecentGamesError = '[statistic] Load Recent Games (Error)',
  CleanStatistic = '[statistic] Clean Statistic',
  InitLeaders = '[statistic] Init Leaders',
  LoadLeadersCompleted = '[statistic] Load Leaders (Success)',
  LoadLeadersError = '[statistic] Load Leaders (Error)'
}

@action()
export class InitBestUsers {
  public readonly type = StatisticTypes.InitBestUsers;
}

@action()
export class LoadBestUsersCompleted {
  public readonly type = StatisticTypes.LoadBestUsersSuccess;

  constructor(public payload: BestUser[]) { }
}

@action()
export class LoadBestUsersError {
  public readonly type = StatisticTypes.LoadBestUsersError;
}

@action()
export class InitMostPopularGames {
  public readonly type = StatisticTypes.InitMostPopularGames;
}

@action()
export class LoadMostPopularGamesCompleted {
  public readonly type = StatisticTypes.LoadMostPopularGamesSuccess;

  constructor(public payload: MostPopularGames[]) { }
}

@action()
export class LoadMostPopularGamesError {
  public readonly type = StatisticTypes.LoadMostPopularGamesError;
}

@action()
export class InitRecentGames {
  public readonly type = StatisticTypes.InitRecentGames;

  constructor(public userToken: string) { }
}

@action()
export class LoadRecentGamesCompleted {
  public readonly type = StatisticTypes.LoadRecentGamesSuccess;

  constructor(public payload: RecentGames[]) { }
}

@action()
export class LoadRecentGamesError {
  public readonly type = StatisticTypes.LoadRecentGamesError;
}
@action()
export class InitLeaders {
  public readonly type = StatisticTypes.InitLeaders;

  constructor(public appName: string) { }
}

@action()
export class LoadLeadersCompleted {
  public readonly type = StatisticTypes.LoadLeadersCompleted;

  constructor(public payload: Leaders[]) { }
}

@action()
export class LoadLeadersError {
  public readonly type = StatisticTypes.LoadLeadersError;
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
  | CleanStatistic
  | InitLeaders
  | LoadLeadersCompleted
  | LoadLeadersError;
