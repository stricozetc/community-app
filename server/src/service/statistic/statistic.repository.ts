import { Game } from '../../typing/game';
import { GameData } from './../../controller/statistic.controller';

import { RecentGameFromServer, Leaders, BestUsersFromServer, PopularGamesFromServer } from './../../../models/otherModels';
import { ErrorBlock } from 'models';

export abstract class StatisticRepository {

    public abstract getMostPopularGames(): Promise<PopularGamesFromServer[]>;
    public abstract getBestUsers(): Promise<BestUsersFromServer[]>;

    public abstract getRecentGames(userToken: string): Promise<RecentGameFromServer[]>;
    public abstract setGameResult(statistic: GameData[], appToken: string): Promise<any>;

    public abstract getLeaders(appName: string): Promise<Leaders[]>;

}
