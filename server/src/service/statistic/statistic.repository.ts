import { Game } from '../../typing/game';
import { GameData } from './../../controller/statistic.controller';

import { RecentGameFromServer, Leaders } from './../../../models/otherModels';

export abstract class StatisticRepository {

    public abstract getMostPopularGames(): Promise<any[]>;
    public abstract getBestUsers(): Promise<any[]>;

    public abstract getRecentGames(userToken: string): Promise<RecentGameFromServer[]>;
    public abstract setGameResult(statistic: GameData[], appToken: string): Promise<any>;

    public abstract getLeaders(appName: string): Promise<Leaders[]>;

}
