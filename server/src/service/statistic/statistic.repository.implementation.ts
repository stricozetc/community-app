import { StatisticRepository } from './statistic.repository';
import { injectable, inject } from 'inversify';

import {
  StatisticModel,
  UserModel,
  Statistic,
  RecentGameFromServer,
  PopularGamesFromServer,
  BestUsersFromServer,
  ErrorBlock,
  GamesModel,
  Game,
  Leaders
} from './../../../models';

import { GameData } from './../../controller/statistic.controller';

import { isEmpty } from './../../validation/is-empty';

import { StatisticService } from './statistic.service';
import { logicErr } from '../../../errors/logicErr';
import { technicalErr } from '../../../errors/technicalErr';
import { LoggerService } from '../logger/logger.service';
import { ResultStatus } from '../../../models/statistic';

import { SocketServiceImplementation } from '../socket/socket.service.implementation';
@injectable()
export class StatisticRepositoryImplementation implements StatisticRepository {
  @inject(StatisticService) private statisticService: StatisticService;
  @inject(LoggerService) private loggerService: LoggerService;
  private socketService: SocketServiceImplementation = SocketServiceImplementation.getInstance();

  public async setGameResult(data: GameData[], appToken: string): Promise<boolean | ErrorBlock> {
    const statistic = data;
    try {
      const tokenRow = await GamesModel.findOne({
        where: { appToken }
      });
      const token = tokenRow && tokenRow.appToken;
      if (token) {
        let promises: Array<Promise<boolean>> = [];
        // statistic = JSON.parse(statistic); // Uncomment to test with PostMan
        promises = statistic.map((stat: Statistic) => this.saveStatistic(token, stat));
        try {
          await Promise.all(promises);
          this.socketService.notifyAllClients('updateLeaders', tokenRow.appName);
          return true;
        } catch (error) {
           throw error;
        }
      } else {
        throw logicErr.notFoundAppToken;
      }
    } catch (error)  {
        if (error.code) {
          throw error;
        } else {
          this.loggerService.errorLog(error);
          throw technicalErr.databaseCrash;
        }
    }
  }

  public async getRecentGames(userToken: string): Promise<RecentGameFromServer[]> {
    try {
      let recentGames = await StatisticModel.findAll({
        where: { userToken },
        order: [['createdAt', 'DESC']]
      });

      const promises = recentGames.map((game) => {
        return GamesModel.find({ where: { appToken: game.appToken } }).then(
          (row) => row.appName
        );
      });

      try {
        const appNames = await Promise.all(promises);
        if (!isEmpty(recentGames)) {
          recentGames = recentGames.reduce((accumulator, game, index) => {
            const gameName = appNames[index];

            const result = {
              game: gameName,
              scores: game.scores,
              result: game.resultStatus
            };

            return accumulator.concat(result);
          },                               []);
        }

        return recentGames;

      } catch (error) {
        this.loggerService.errorLog(error);
        throw technicalErr.databaseCrash;
      }

    } catch (error) {
        if (error.code) {
          throw error;
        } else {
          this.loggerService.errorLog(error);
          throw technicalErr.databaseCrash;
        }
    }
  }

  public getMostPopularGames(): Promise<PopularGamesFromServer[]> {
    return new Promise<PopularGamesFromServer[]>(
      async (resolvePopularGames) => {
        try {
          const gamesAndTokens: Array<{
            appToken: string;
            appName: string }> = await GamesModel.findAll({
              attributes: ['appToken', 'appName'] });

          const tokens = gamesAndTokens.map((row) => row.appToken);
          const promises = tokens.map(async (currentToken) => {
            try {
              const historyRows = await StatisticModel.findAll({
                where: { appToken: currentToken }
              });

              const playedTime = this.statisticService.calculatePlayedTime(historyRows);
              const playedInWeek = this.statisticService.calculatePlayedInWeek(
                historyRows
              );
              const result = {
                token: currentToken,
                playedTime,
                playedInWeek
              };

              return result;
            } catch (error) {
              this.loggerService.errorLog(error);
              throw technicalErr.databaseCrash;
            }
          });

          try {
            const allGamesAndItsPlayedTime = await Promise.all(promises);
            let mostPopularGames = allGamesAndItsPlayedTime.reduce(
              (accumulator, game) => {
                const gameName = gamesAndTokens.find(
                  (el) => el.appToken === game.token
                ).appName;
                const result = {
                  game: gameName,
                  playedTime: game.playedTime,
                  playedInWeek: game.playedInWeek
                };
                return accumulator.concat(result);
              },
              []
            );
            mostPopularGames = this.statisticService.sortBy(
              mostPopularGames,
              'playedTime'
            );

            return resolvePopularGames(mostPopularGames);
          } catch (error) {
            throw error;
          }

        } catch (error) {
          if (error.code) {
            throw error;
          } else {
            this.loggerService.errorLog(error);
            throw technicalErr.databaseCrash;
          }
        }
      }
    );
  }

  public getBestUsers(): Promise<BestUsersFromServer[]> {
    return new Promise<BestUsersFromServer[]>(
      async (resolveBestUsers, reject) => {
        try {
          const users = await UserModel.findAll({ attributes: ['token', 'name', 'isActive'] });
          const promises = users.map(async (currentUser) => {
            if (currentUser.isActive) {
              try {
                const historyRows = await StatisticModel.findAll({
                  where: { userToken: currentUser.token }
                });

                const playedTime = this.statisticService.calculatePlayedTime(historyRows);
                const scoresArray = historyRows.map((row) => {
                  return row.scores;
                });
                let scores = 0;
                if (!isEmpty(scoresArray)) {
                  scores = scoresArray.reduce((a, b) => a + b);
                }

                const result = {
                  userToken: currentUser.token,
                  name: currentUser.name,
                  playedTime,
                  scores
                };
                return result;
              } catch (error) {
                this.loggerService.errorLog(error);
                throw technicalErr.databaseCrash;
              }
            } else {
              throw logicErr.userShouldBeActive;
            }
          });

          try {
            const allUsersStatistic = await Promise.all(promises);

            const bestUsers = this.statisticService
              .sortBy(allUsersStatistic, 'scores')
              .filter((user) => user.scores > 0);

            return resolveBestUsers(bestUsers);
          } catch (error) {
            throw error;
          }
        } catch (error) {
          if (error.code) {
            throw error;
          } else {
            this.loggerService.errorLog(error);
            throw technicalErr.databaseCrash;
          }
        }
    });
  }

  public async getLeaders(appName: string): Promise<Leaders[]> {
    try {
      const tokenRow = await GamesModel.findOne({
        where: { appName }
      });
      const token = tokenRow && tokenRow.appToken;
      if (token) {
        return new Promise<Leaders[]>(async (resolveBestUsers, reject) => {

          try {
            const users = await UserModel.findAll({ attributes: ['token', 'name', 'isActive'] });
            const promises = users.map( async (currentUser) => {
              if (currentUser.isActive) {
                try {
                  const historyRows = await StatisticModel.findAll({
                    where: { userToken: currentUser.token, appToken: token }
                  });

                  const scoresArray = historyRows.map((row) => {
                    return row.scores;
                  });
                  let scores = 0;
                  if (!isEmpty(scoresArray)) {
                    scores = scoresArray.reduce((a, b) => a > b ? a : b);
                  }

                  const result = {
                    userToken: currentUser.token,
                    name: currentUser.name,
                    scores
                  };
                  return result;
                } catch (error) {
                  this.loggerService.errorLog(error);
                  throw technicalErr.databaseCrash;
                }
              } else {
                throw logicErr.userShouldBeActive;
              }
            });

            try {
              const allUsersStatistic = await Promise.all(promises);
              const bestUsers = this.statisticService
                .sortBy(allUsersStatistic, 'scores')
                .filter((user) => user.scores > 0);
              return resolveBestUsers(bestUsers);
            } catch (error) {
              throw error;
            }
          } catch (error) {
            if (error.code) {
              throw error;
            } else {
              this.loggerService.errorLog(error);
              throw technicalErr.databaseCrash;
            }
            }
        });
      } else {
        throw logicErr.notFoundAppToken;
      }
    } catch (error) {
      if (error.code) {
        throw error;
      } else {
        this.loggerService.errorLog(error);
        throw technicalErr.databaseCrash;
      }
    }
  }

  private async saveStatistic(token: string, stat: Statistic): Promise<boolean> {
    const newStatistic = StatisticModel.build({
      appToken: token,
      userToken: stat.userToken,
      playedTime: stat.playedTime,
      scores: stat.scores,
      resultStatus: stat.resultStatus,
      participationStatus: stat.participationStatus
    });

    try {
      await newStatistic.save();
      return true;
    } catch (error) {
      this.loggerService.errorLog(error);
      throw technicalErr.databaseCrash;
    }
  }
}
