import { StatisticRepository } from './statistic.repository';
import { injectable } from 'inversify';
import { Game } from '../../typing/game';

import {
  StatisticModel,
  AppTokenModel,
  UserModel,
  Statistic,
  TokenFromDb,
  RecentGameFromServer,
  PopularGamesFromServer,
  BestUsersFromServer,
  ErrorBlock
} from './../../../models';

import { GameData } from './../../controller/statistic.controller';

import Promise = require('bluebird');
import { isEmpty } from './../../validation/is-empty';

import { inject } from 'inversify';
import { StatisticService } from './statistic.service';
import { logicErr } from '../../../errors/logicErr';
import { technicalErr } from '../../../errors/technicalErr';
import { LoggerService } from '../logger/logger.service';

@injectable()
export class StatisticRepositoryImplementation implements StatisticRepository {
  public constructor(
    @inject(StatisticService) private statisticService: StatisticService,
    @inject(LoggerService) private loggerService: LoggerService,
  ) { }

  public setGameResult(data: GameData[], appToken: string): Promise<boolean | ErrorBlock> {
    const statistic = data;

    return AppTokenModel.findOne({
      where: { token: appToken }
    }).then((tokenRow: TokenFromDb) => {
      const token = tokenRow && tokenRow.token;
      if (token) {
        let promises: Array<Promise<boolean>> = [];
        // statistic = JSON.parse(statistic); // Uncomment to test with PostMan
        promises = statistic.map((stat: Statistic) => this.saveStatistic(token, stat));
        return Promise.all(promises)
          .then(() => {
            return true;
          })
          .catch((error) => {
            throw error;
          });
      } else {
        throw logicErr.notFoundAppToken;
      }
    })
      .catch((error: any) => {
        if (error.code) {
          throw error;
        } else {
          this.loggerService.errorLog(error);
          throw technicalErr.databaseCrash;
        }
      });
  }

  public getRecentGames(userToken: string): Promise<RecentGameFromServer[]> {
    return StatisticModel.findAll({
      where: { userToken },
      order: [['createdAt', 'DESC']]
    })
      .then((recentGames) => {
        if (!isEmpty(recentGames)) {
          throw logicErr.notFoundRecentGames;
        }

        const promises = recentGames.map((game) => {
          return AppTokenModel.find({ where: { token: game.appToken } }).then(
            (row) => row.appName
          );
        });

        return Promise.all(promises)
          .then((appNames) => {
            if (!isEmpty(recentGames)) {
              recentGames = recentGames.reduce((accumulator, game, index) => {
                const gameName = appNames[index];

                const result = {
                  game: gameName,
                  scores: game.scores,
                  result: game.status === 1
                };

                return accumulator.concat(result);
              }, []);
            }
            return recentGames;
          })
          .catch((error) => {
            this.loggerService.errorLog(error);
            throw technicalErr.databaseCrash;
          });
      })
      .catch((error) => {
        if (error.code) {
          throw error;
        } else {
          this.loggerService.errorLog(error);
          throw technicalErr.databaseCrash;
        }
      });
  }

  public getMostPopularGames(): Promise<PopularGamesFromServer[]> {
    return new Promise<PopularGamesFromServer[]>(
      (resolvePopularGames) => {
        AppTokenModel.findAll({ attributes: ['token', 'appName'] })
          .then((gamesAndTokens: Array<{ token: string; appName: string }>) => {
            const tokens = gamesAndTokens.map((row) => row.token);
            const promises = tokens.map((currentToken) => {
              return StatisticModel.findAll({
                where: { appToken: currentToken }
              }).then((historyRows) => {
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
              }).catch((error) => {
                this.loggerService.errorLog(error);
                throw technicalErr.databaseCrash;
              });
            });

            return Promise.all(promises)
              .then(
                (
                  allGamesAndItsPlayedTime: Array<{
                    token: string;
                    playedTime: number;
                    playedInWeek: number;
                  }>
                ) => {
                  let mostPopularGames = allGamesAndItsPlayedTime.reduce(
                    (accumulator, game) => {
                      const gameName = gamesAndTokens.find(
                        (el) => el.token === game.token
                      ).appName;

                      const result = {
                        name: gameName,
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
                }
              )
              .catch((error) => {
                throw error;
              });
          })
          .catch((error) => {
            if (error.code) {
              throw error;
            } else {
              this.loggerService.errorLog(error);
              throw technicalErr.databaseCrash;
            }
          });
      }
    );
  }

  public getBestUsers(): Promise<BestUsersFromServer[]> {
    return new Promise<BestUsersFromServer[]>((resolveBestUsers, reject) => {

      UserModel.findAll({ attributes: ['token', 'name', 'isActive'] })
        .then((users) => {
          const promises = users.map((currentUser) => {
            if (currentUser.isActive) {
              return StatisticModel.findAll({
                where: { userToken: currentUser.token }
              })
                .then((historyRows) => {
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
                })
                .catch((error) => {
                  this.loggerService.errorLog(error);
                  throw technicalErr.databaseCrash;
                });
            } else {
              throw logicErr.userShouldBeActive;
            }
          });
          return Promise.all(promises)
            .then((allUsersStatistic) => {
              const bestUsers = this.statisticService
                .sortBy(allUsersStatistic, 'scores')
                .filter((user) => user.scores > 0);

              return resolveBestUsers(bestUsers);
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch((error) => {
          if (error.code) {
            throw error;
          } else {
            this.loggerService.errorLog(error);
            throw technicalErr.databaseCrash;
          }
        });
    });
  }

  private saveStatistic(token: string, stat: Statistic): Promise<boolean> {
    const newStatistic = StatisticModel.build({
      appToken: token,
      userToken: stat.userToken,
      playedTime: stat.playedTime,
      scores: stat.scores,
      resultStatus: stat.resultStatus,
      participationStatus: stat.participationStatus
    });

    return newStatistic
      .save()
      .then(() => true)
      .catch((error: any) => {
        this.loggerService.errorLog(error);
        throw technicalErr.databaseCrash;
      });
  }
}
