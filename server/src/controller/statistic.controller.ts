import { controller, httpGet, httpPost } from 'inversify-express-utils';
import * as passport from 'passport';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import Promise = require('bluebird');

import { StatisticRepository } from './../service/statistic';

import { ResultStatus } from '../../models';
import { ParticipationStatus } from '../../models';
import { logicErr } from '../../errors/logicErr';
import { validateGameDataInput } from '../validation/statistic';

export interface GameData {
  userToken: string;
  playedTime: number;
  scores: number;
  resultStatus: ResultStatus;
  participationStatus: ParticipationStatus;
}

@controller('/api/v1/statistic')
export class StatisticController {

  public constructor(@inject(StatisticRepository) private statisticRepository: StatisticRepository) {
  }

  @httpPost('/set-game-result')
  public setGameResult(request: Request, response: Response): Promise<void | Response> | Response {
    const data: GameData[] = request.body;

    for (let index = 0; index < data.length; index++) {
      const { errors, isValid } = validateGameDataInput(data[index]);

      if (!isValid) {
        return response.status(400).json(errors);
      }
    }

    let appToken: string = request.headers.authorization;
    appToken = appToken.replace('Bearer ', '');

    return this.statisticRepository.setGameResult(data, appToken)
      .catch((error) => {
        return error.code >= 2000 ?
          response.status(500).json(error) :
          response.status(400).json(error);
      });
  }

  @httpGet('/recent-games', passport.authenticate('jwt', { session: false }))
  public getRecentGames(request: Request, response: Response): Promise<void | Response> | Response {
    const userId = request.query.userId;

    if (!userId) {
      return response.status(400).json(logicErr.userIdIsRequired);
    }

    return this.statisticRepository.getRecentGames(userId)
      .then((recentGames: any[]) => {
        return response.status(200).json(recentGames);
      }).catch((error) => {
        return error.code >= 2000 ?
          response.status(500).json(error) :
          response.status(400).json(error);
      });
  }

  @httpGet('/most-popular-games', passport.authenticate('jwt', { session: false }))
  public getMostPopularGames(request: Request, response: Response): Promise<void | Response> {
    return this.statisticRepository.getMostPopularGames()
      .then((mpg: any[]) => {
        response.status(200).json(mpg);
      }).catch((error) => {
        return error.code >= 2000 ?
          response.status(500).json(error) :
          response.status(400).json(error);
      });
  }

  @httpGet('/best-users', passport.authenticate('jwt', { session: false }))
  public getBestUsers(request: Request, response: Response): Promise<void | Response> {
    return this.statisticRepository.getBestUsers()
      .then((bestUsers: any[]) => {
        response.status(200).json(bestUsers);
      }).catch((error) => {
        return error.code >= 2000 ?
          response.status(500).json(error) :
          response.status(400).json(error);
      });
  }

  @httpGet('/statistic', passport.authenticate('jwt', { session: false }))
  public getStatistic(request: Request, response: Response): Promise<void | Response> {
    return this.statisticRepository.getMostPopularGames()
      .then((mpg: any[]) => {
        response.status(200).json(mpg);
      }).catch((error) => {
        return error.code >= 2000 ?
          response.status(500).json(error) :
          response.status(400).json(error);
      });
  }
}
