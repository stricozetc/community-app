import { controller, httpGet, httpPost } from 'inversify-express-utils';
import * as passport from 'passport';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import Promise = require("bluebird");

import { 
  HistoryRepository 
} from './../service/history';

import { Game } from '../typing/game';

export interface DataFromGame { 
  statistic: any; // Temporary. Before test with real API, not with postman
}

export interface Statistic {
  userId: number;
  playedTime: number;
  scores: number;
  isWin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@controller('/api/v1/statistic')
export class StatisticController {

  public constructor(@inject(HistoryRepository) private historyRepository: HistoryRepository) {
  }

  @httpPost('/set-game-result')
  public collectStatistic(request: Request, response: Response): Promise<void | Response> | Response {
      const data: DataFromGame  = request.body;
      const appToken: string = request.headers.authorization;

      return this.historyRepository.collectStatistic(data, appToken)
      .catch((err) => {
        console.log('ERROR from controller', err);

        return response.status(400).send(err);
      });
   
  }

  @httpGet('/get-recent-games', passport.authenticate('jwt', {session: false}))
  public getRecentGames(request: Request, response: Response): Promise<void | Response> {

    return this.historyRepository.getRecentGames(request.query.userId)
      .then((recentGames: any[]) => {
        response.status(200).json(recentGames);
      }).catch((err) => {

        console.log(err);

        return response.status(400).json(err);
      });
  }

  @httpGet('/get-most-popular-games', passport.authenticate('jwt', {session: false}))
  public getMostPopularGames(request: Request, response: Response): Promise<void | Response> {
    return this.historyRepository.getMostPopularGames()
      .then((mpg: any[]) => {
        console.log('MOST POPULAR GAMES', mpg);
        response.status(200).json(mpg);
      }).catch((err) => {
        return response.status(400).json(err);
      });
  }

  @httpGet('/get-best-users', passport.authenticate('jwt', {session: false}))
  public getBestUsers(request: Request, response: Response): Promise<void | Response> {
    return this.historyRepository.getBestUsers()
      .then((bestUsers: any[]) => {
        console.log('BEST USERS', bestUsers);
        response.status(200).json(bestUsers);
      }).catch((err) => {
        console.log(err);

        return response.status(400).json(err);
      });
  }

  

  @httpGet('/get-history', passport.authenticate('jwt', {session: false}))
  public getHistory(request: Request, response: Response): Promise<void | Response> {
    return this.historyRepository.getMostPopularGames()
      .then((mpg: any[]) => {
        response.status(200).json(mpg);
      }).catch((err) => {
        return response.status(400).json(err);
      });
  }

}
