import { action } from '../decorators';

export enum StatisticTypes {
    InitBestUsers = '[statistic] Init Best Users',
    BestUsersInited = '[statistic] Best Users Inited',
    InitMostPopularGames = '[statistic] Init Most Popular Games',
    MostPopularGamesInited = '[statistic] Most Popular Games Inited',
    InitRecentGames = '[statistic] Init Recent Games',
    RecentGamesInited = '[statistic] Recent Games Inited'
}

@action()
export class InitBestUsers {
    public readonly type = StatisticTypes.InitBestUsers;

}

@action()
export class BestUsersInited {
    public readonly type = StatisticTypes.BestUsersInited;

    constructor(public payload: any[]) { }
}

@action()
export class InitMostPopularGames {
    public readonly type = StatisticTypes.InitMostPopularGames;
}

@action()
export class MostPopularGamesInited {
    public readonly type = StatisticTypes.MostPopularGamesInited;

    constructor(public payload: any[]) { }
}

@action()
export class InitRecentGames {
    public readonly type = StatisticTypes.InitRecentGames;

}

@action()
export class RecentGamesInited {
    public readonly type = StatisticTypes.RecentGamesInited;

    constructor(public payload: any[]) { }
}

export type StatisticAction =
    | InitBestUsers
    | BestUsersInited
    | InitMostPopularGames
    | MostPopularGamesInited
    | InitRecentGames
    | RecentGamesInited ;
