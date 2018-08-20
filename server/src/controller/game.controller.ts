import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import Promise = require('bluebird');

import {
  GamesRepository
} from '../service/games';
import { MyGameInterface } from '../../models/games';

@controller('/api/games')
export class MockController {

  public constructor(@inject(GamesRepository) private mocksRepository: GamesRepository) {
  }

  @httpGet('/get-games')
    public getGames(request: Request, response: Response): Promise<void | Response> {

      return this.mocksRepository.getGames()
        .then((games: MyGameInterface[]) => {
          response.status(200).json(games);
        }).catch((err) => {
          return response.status(400).json(err);
        });
    }
}
