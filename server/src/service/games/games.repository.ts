import { Game } from '../../../models/games';

import Promise = require('bluebird');

export abstract class GamesRepository {
    public abstract getGames(): Promise<Game[]>;
}
