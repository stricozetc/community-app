import { MyGameInterface } from '../../../models/games';

import Promise = require("bluebird");

export abstract class MyGamesRepository {

    public abstract deleteGame(data: MyGameInterface): void;
    public abstract addGame(data: MyGameInterface): Promise<MyGameInterface>;

    public abstract editGame(data: MyGameInterface): void;
    public abstract getGames(userId: number):  Promise<MyGameInterface[]>;
}
