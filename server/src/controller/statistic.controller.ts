import { controller, httpGet, httpPost } from 'inversify-express-utils';
import * as passport from 'passport';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import Promise = require("bluebird");

import { 
  StatisticRepository 
} from './../service/statistic';

import { Game } from '../typing/game';

export interface DataFromGame { 
  statistic: any;
}


@controller('/api/v1/statistic')
export class StatisticController {

  public constructor(@inject(StatisticRepository) private statisticRepository: StatisticRepository) {
  }

  @httpPost('/set-game-result')
  public setGameResult(request: Request, response: Response): Promise<void | Response> | Response {
      const data: DataFromGame  = request.body;
      const appToken: string = request.headers.authorization;

      return this.statisticRepository.setGameResult(data, appToken)
      .catch((err) => {

        return response.status(400).send(err);
      });
   
  }

  @httpGet('/recent-games', passport.authenticate('jwt', {session: false}))
  public getRecentGames(request: Request, response: Response): Promise<void | Response> {

    return this.statisticRepository.getRecentGames(request.query.userId)
      .then((recentGames: any[]) => {
        response.status(200).json(recentGames);
      }).catch((err) => {
        return response.status(400).json(err);
      });
  }

  @httpGet('/most-popular-games', passport.authenticate('jwt', {session: false}))
  public getMostPopularGames(request: Request, response: Response): Promise<void | Response> {
    return this.statisticRepository.getMostPopularGames()
      .then((mpg: any[]) => {
        response.status(200).json(mpg);
      }).catch((err) => {
        return response.status(400).json(err);
      });
  }

  @httpGet('/best-users', passport.authenticate('jwt', {session: false}))
  public getBestUsers(request: Request, response: Response): Promise<void | Response> {
    return this.statisticRepository.getBestUsers()
      .then((bestUsers: any[]) => {
        response.status(200).json(bestUsers);
      }).catch((err) => {
        return response.status(400).json(err);
      });
  }

  

  @httpGet('/statistic', passport.authenticate('jwt', {session: false}))
  public getStatistic(request: Request, response: Response): Promise<void | Response> {
    return this.statisticRepository.getMostPopularGames()
      .then((mpg: any[]) => {
        response.status(200).json(mpg);
      }).catch((err) => {
        return response.status(400).json(err);
      });
  }

}
