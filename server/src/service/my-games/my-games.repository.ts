import { MyGameInterface } from '../../../models/games';

import Promise = require('bluebird');

export abstract class MyGamesRepository {

    public abstract deleteGame(gameThaNeedToDelete: MyGameInterface): Promise<MyGameInterface[]>;
    public abstract addGame(newGame: MyGameInterface): Promise<MyGameInterface>;
    public abstract editGame(data: MyGameInterface): Promise<MyGameInterface[]>;
    public abstract getGames(userId: number):  Promise<MyGameInterface[]>;
}
