import Promise = require('bluebird');
import { injectable } from 'inversify';

import { MyGameInterface, GamesModel } from '../../../models/games';

import { MyGamesRepository } from './my-games.repository';

@injectable()
export class MyGamesRepositoryImplementation implements MyGamesRepository {
    public deleteGame(gameThatNeedToDelete: MyGameInterface): Promise<MyGameInterface[]> {
        return new Promise<MyGameInterface[]>((resolve, reject) => {
            GamesModel.destroy({
                where: {
                    id: gameThatNeedToDelete.id
                }
            }).then(() => {
                const games = GamesModel.findAll({
                    where: {
                        userId: gameThatNeedToDelete.userId
                    }
                });

                resolve(games);
            });
        });

    }

    public editGame(gameThatNeedEdit: MyGameInterface): Promise<MyGameInterface[]> {
        return GamesModel.upsert({
            id: +gameThatNeedEdit.id,
            userId: +gameThatNeedEdit.userId,
            appName: gameThatNeedEdit.appName,
            description: gameThatNeedEdit.description,
            maxRoomPlayer: +gameThatNeedEdit.maxRoomPlayer,
            maxRooms: +gameThatNeedEdit.maxRooms,
            requestUrl: gameThatNeedEdit.requestUrl,
            maxWaitingTime: +gameThatNeedEdit.maxWaitingTime,
            redirectUrl: gameThatNeedEdit.redirectUrl,
            registrationEventName: gameThatNeedEdit.registrationEventName,
            leaveEventName: gameThatNeedEdit.leaveEventName,
            updateRoomsInfoEventName: gameThatNeedEdit.updateRoomsInfoEventName,
            notifyCountdown: gameThatNeedEdit.notifyCountdown
        }).then(() => {
            return GamesModel.findAll({
                where: {
                    userId: gameThatNeedEdit.userId
                }
            });
        });

    }

    public addGame(data: MyGameInterface): Promise<MyGameInterface> {
        return new Promise<MyGameInterface>((resolve, reject) => {
            const game = GamesModel.build(
                {
                    userId: +data.userId,
                    appName: data.appName,
                    description: data.description,
                    maxRoomPlayer: +data.maxRoomPlayer,
                    maxRooms: +data.maxRooms,
                    requestUrl: data.requestUrl,
                    maxWaitingTime: +data.maxWaitingTime,
                    redirectUrl: data.redirectUrl,
                    registrationEventName: data.registrationEventName,
                    leaveEventName: data.leaveEventName,
                    updateRoomsInfoEventName: data.updateRoomsInfoEventName,
                    notifyCountdown: data.notifyCountdown
                }
            );

            game.save().then(() => resolve(game));
        })

    }

    public getGames(userId: number): Promise<MyGameInterface[]> {
        return GamesModel.findAll({
            where: {
                userId
            }
        });
    }
}
