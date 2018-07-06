import { controller, httpGet } from 'inversify-express-utils';
import * as passport from 'passport';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import {
  MocksRepository
} from '../service/mocks';
import { QuestInfo } from '../typing/quest-info';

@controller('/api/mocks')
export class MockController {

  constructor(@inject(MocksRepository) private mocksRepository: MocksRepository) {
  }

  @httpGet('/quests', passport.authenticate('jwt', {session: false}))
  public getGames(request: Request, response: Response): Promise<void | Response> {
    return this.mocksRepository.getGames()
      .then((quests: QuestInfo[]) => {
        response.status(200).json(quests);
      }).catch((err) => {
        return response.status(400).json(err);
      });
  }

  @httpGet('/best-users', passport.authenticate('jwt', {session: false}))
  public getBestUsers(request: Request, response: Response): Promise<void | Response> {
    return this.mocksRepository.getBestUsers()
      .then((bu: any[]) => {
        response.status(200).json(bu);
      }).catch((err) => {
        return response.status(400).json(err);
      });
  }

  @httpGet('/most-popular-games', passport.authenticate('jwt', {session: false}))
  public getMostPopularGames(request: Request, response: Response): Promise<void | Response> {
    return this.mocksRepository.getMostPopularGames()
      .then((mpg: any[]) => {
        response.status(200).json(mpg);
      }).catch((err) => {
        return response.status(400).json(err);
      });
  }

  @httpGet('/recent-games', passport.authenticate('jwt', {session: false}))
  public getRecentGames(request: Request, response: Response): Promise<void | Response> {
    return this.mocksRepository.getRecentGames()
      .then((rg: any[]) => {
        response.status(200).json(rg);
      }).catch((err) => {
        return response.status(400).json(err);
      });
  }


  @httpGet('/')
  public getCurrentUser(request: Request, response: Response): any {
    console.log('Mock');
  }
}
