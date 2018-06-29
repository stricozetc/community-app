import { controller, httpGet } from 'inversify-express-utils';
import * as passport from 'passport';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import {
  MocksRepository
} from '../service/mocks';

import { Game } from './../../Interfaces/Game';

@controller('/api/mocks')
export class MockController {

  constructor(@inject(MocksRepository) private mocksRepository: MocksRepository) { }

  @httpGet('/games', passport.authenticate('jwt', { session: false }))
  public getGames(request: Request, response: Response): Promise<void | Response> {
    return this.mocksRepository.getGames()
      .then((games: Game[]) => {
        response.status(200).json(games);
      }).catch((err) => {
        return response.status(400).json(err);
      });
  }

  @httpGet('/')
  public getCurrentUser(request: Request, response: Response): any {
    console.log('Mock');
  }
}
