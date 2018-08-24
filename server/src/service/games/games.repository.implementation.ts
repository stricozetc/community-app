import { GamesRepository } from './games.repository';
import { injectable } from 'inversify';
import Promise = require('bluebird');

import { GamesModel, Game } from 'models/games';

@injectable()
export class GamesRepositoryImplementation implements GamesRepository {
  public getGames(): Promise<Game[]> {
    return GamesModel.findAll({
        where: {
          approve: true
        }
    });
  }
}
