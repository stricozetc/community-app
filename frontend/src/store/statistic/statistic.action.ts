import { action } from '../decorators';

import { errorsFromServer } from 'models';

export enum StatisticTypes {
    InitBestUsers = '[statistic] Init Best Users',
    LoadBestUsersCompleted = '[statistic] Load Best Users Completed',
    LoadBestUsersFailed = '[statistics] Load Best Users Completed',
    InitMostPopularGames = '[statistic] Init Most Popular Games',
    LoadMostPopularGamesCompleted = '[statistic] Load Most Popular Games Completed',
    LoadMostPopularGamesFailed = '[statistics] Load Most Popular Games Failed',
    InitRecentGames = '[statistic] Init Recent Games',
    LoadRecentGamesCompleted = '[statistic] Load Recent Games Complated',
    LoadRecentGamesFailed = '[statistic] Load Recent Games Failed'
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

    constructor(public err: errorsFromServer) { }
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

    constructor(public err: errorsFromServer) { }
}

@action()
export class InitRecentGames {
    public readonly type = StatisticTypes.InitRecentGames;

}

@action()
export class LoadRecentGamesCompleted {
    public readonly type = StatisticTypes.LoadRecentGamesCompleted;

    constructor(public payload: any[]) { }
}

@action()
export class LoadRecentGamesFailed {
    public readonly type = StatisticTypes.LoadRecentGamesFailed;

    constructor(public err: errorsFromServer) { }
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
    | LoadRecentGamesFailed ;
  

