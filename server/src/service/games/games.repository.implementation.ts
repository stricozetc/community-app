import { GamesRepository } from './games.repository';
import { injectable } from 'inversify';

import { GamesModel, Game } from 'models/games';

@injectable()
export class GamesRepositoryImplementation implements GamesRepository {
  public async getGames(): Promise<Game[]> {
    return await GamesModel.findAll({
        where: {
          approve: true
        }
    });
  }
}
