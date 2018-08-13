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
  BestUsersFromServer
} from './../../../models';

import { Sequelize } from 'sequelize';
import { DataFromGame } from './../../controller/statistic.controller';

import Promise = require('bluebird');
import { isEmpty } from './../../validation/is-empty';
import { resolve } from 'url';

import { AppTokenRepository } from './../app-token/app-token.repository';
import { inject } from 'inversify';
import { StatisticService } from './statistic.service';

@injectable()
export class StatisticRepositoryImplementation implements StatisticRepository {
  public constructor(
    @inject(StatisticService) private statisticService: StatisticService
  ) {}

  public setGameResult(data: DataFromGame[], appToken: string): Promise<boolean> {
    const statistic  = data;

    return AppTokenModel.findOne({
      where: { token: appToken }
    })
      .then((tokenRow: TokenFromDb) => {
        const token = tokenRow && tokenRow.token;
        if (token) {

          let promises: Array<Promise<boolean>> = [];
          // statistic = JSON.parse(statistic); // Uncomment to test with PostMan
          promises = statistic.map((stat: Statistic) => {

            return this.saveStatistic(token, stat);
          }

          );

          return Promise.all(promises)
            .then(() => {
              return true;
            })

            .catch((err) => {
             return err;
            });
        } else {
          return 'you must register your game and provide correct app token';
        }
      })

      .catch((err: any) => {
        return err;
      });
  }

  public getRecentGames(userToken: string): Promise<RecentGameFromServer[]> {
    return StatisticModel.findAll({

      where: { userToken },
      order: [['createdAt', 'DESC']]

    })

      .then((recentGames) => {
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
                  result: game.resultStatus
                };

                return accumulator.concat(result);
              },                               []);
            }

            return recentGames;
          })

          .catch((err) => err);
      })

      .catch((err) => err);
  }

  public getMostPopularGames(): Promise<PopularGamesFromServer[]> {
    return new Promise<PopularGamesFromServer[]>(
      (resolvePopularGames, reject) => {
        AppTokenModel.findAll({ attributes: ['token', 'appName'] })

          .then((gamesAndTokens: Array<{ token: string; appName: string }>) => {
            const tokens = gamesAndTokens.map((row) => row.token);


            const promises = tokens.map((currentToken) => {
              return StatisticModel.findAll({
                where: { appToken: currentToken }
              })

                .then((historyRows) => {


                  const playedTime =  this.statisticService.calculatePlayedTime(historyRows);

                  const playedInWeek = this.statisticService.calculatePlayedInWeek(
                    historyRows
                  );


                  const result = {
                    token: currentToken,
                    playedTime,
                    playedInWeek
                  };

                  return result;
                })

                .catch((err) => reject(err));
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
                }
              )

              .catch((err) => reject(err));
          })

          .catch((err) => reject(err));
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
                  const playedTime =  this.statisticService.calculatePlayedTime(historyRows);


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

                .catch((err) => reject(err));
            } else {
              reject('User should be Active');
            }
          });

          return Promise.all(promises)

            .then((allUsersStatistic) => {
              const bestUsers = this.statisticService
                .sortBy(allUsersStatistic, 'scores')

                .filter((user) => user.scores > 0);

              return resolveBestUsers(bestUsers);
            })

            .catch((err) => reject(err));
        })

        .catch((err) => reject(err));
    });
  }

  private saveStatistic(token: string, stat: Statistic): Promise<boolean> {
    const newHistory = StatisticModel.build({
      appToken: token,
      userToken: stat.userToken,
      playedTime: stat.playedTime,
      scores: stat.scores,

      resultStatus: stat.resultStatus,
      participationStatus: stat.participationStatus
    });

    return newHistory
      .save()
      .then((savedHistory: Statistic) => true)

      .catch((err: any) => {
        return err;
      });
  }
}
