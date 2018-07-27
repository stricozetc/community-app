import { Game } from '../../typing/game';
import { DataFromGame } from './../../controller/statistic.controller';

import { RecentGameFromServer } from './../../../models/otherModels';
import Promise = require("bluebird");

export abstract class StatisticRepository {

    public abstract getMostPopularGames(): Promise<any[]>;
    public abstract getBestUsers(): Promise<any[]>;

    public abstract getRecentGames(userToken: string): Promise<RecentGameFromServer[]>;
    public abstract setGameResult(statistic: DataFromGame[], appToken: string): Promise<any>;

}
