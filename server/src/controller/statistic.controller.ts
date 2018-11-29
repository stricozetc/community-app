import { controller, httpGet, httpPost } from 'inversify-express-utils';
import passport from 'passport';
import { Request, Response } from 'express';
import { inject } from 'inversify';

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

   /**
    * @param {Request} request - data from request
    * @param {GameData[]} request.body - array of games results
    * after successful validation of the game results,
    * controller return true
    */
  @httpPost('/set-game-result')
  public async setGameResult(request: Request, response: Response): Promise<void | Response> {

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

   /**
    * @param {Request} request - data from request
    * @param {object} request.query - data from request
    * @param {number} request.query.userId - array of games results
    * controller return recently played games by the user with this id
    */
  @httpGet('/recent-games', passport.authenticate('jwt', { session: false }))
  public async getRecentGames(request: Request, response: Response): Promise<void | Response> {
    const userToken = request.query.userId;

    if (!userToken) {
      return response.status(400).json(logicErr.userTokenIsRequired);
    }

    try {
      const recentGames = await this.statisticRepository.getRecentGames(userToken);
      return response.status(200).json(recentGames);
    } catch (error) {
      return error.code >= 2000 ?
        response.status(500).json(error) :
        response.status(400).json(error);
    }
  }

   /**
    * controller return most popular games
    */
  @httpGet('/most-popular-games', passport.authenticate('jwt', { session: false }))
  public async getMostPopularGames(request: Request, response: Response): Promise<void | Response> {
    try {
      const mpg = await this.statisticRepository.getMostPopularGames();
      return response.status(200).json(mpg);
    } catch (error) {
        return error.code >= 2000 ?
          response.status(500).json(error) :
          response.status(400).json(error);
    }
  }

   /**
    * controller return best users
    */
  @httpGet('/best-users', passport.authenticate('jwt', { session: false }))
  public async getBestUsers(request: Request, response: Response): Promise<void | Response> {
    try {
      const bestUsers = await this.statisticRepository.getBestUsers();
      return response.status(200).json(bestUsers);
    } catch (error) {
        return error.code >= 2000 ?
          response.status(500).json(error) :
          response.status(400).json(error);
    }
  }

   /**
    * controller return most popular games
    */
  @httpGet('/statistic', passport.authenticate('jwt', { session: false }))
  public async getStatistic(request: Request, response: Response): Promise<void | Response> {
    try {
      const mpg = await this.statisticRepository.getMostPopularGames();
      return response.status(200).json(mpg);
    } catch (error) {
        return error.code >= 2000 ?
          response.status(500).json(error) :
          response.status(400).json(error);
    }
  }

   /**
    * @param {Request} request - data from request
    * @param {any} request.query - data from request
    * @param {number} request.query.appName - application id
    * controller return top 10 best users by specific game
    */
  @httpGet('/get-leaders')
  public async getGames(request: Request, response: Response): Promise<void | Response> {

    const appName: string = request.query.appName;
    try {
      const leaders = await this.statisticRepository.getLeaders(appName);
      return response.status(200).json(leaders);
    } catch (err) {
        return response.status(400).json(err);
    }
  }
}
