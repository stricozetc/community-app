import { injectable } from 'inversify';
import { Game, GamesModel } from 'models/games';

import { MyGamesRepository } from './my-games.repository';

@injectable()
export class MyGamesRepositoryImplementation implements MyGamesRepository {
    public deleteGame(gameThatNeedToDelete: Game): Promise<Game[]> {
        return new Promise<Game[]>((resolve, reject) => {
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

    public async editGame(game: Game): Promise<Game[]> {
            await GamesModel.update({
            appName: game.appName,
            description: game.description,
            maxRoomPlayer: +game.maxRoomPlayer,
            maxRooms: +game.maxRooms,
            requestUrl: game.requestUrl,
            maxWaitingTime: +game.maxWaitingTime,
            redirectUrl: game.redirectUrl,
            registrationEventName: game.registrationEventName,
            leaveEventName: game.leaveEventName,
            updateRoomsInfoEventName: game.updateRoomsInfoEventName,
            notifyCountdown: game.notifyCountdown
        },
                                    { where: { id: +game.id } }
        );

            return GamesModel.findAll({
                where: {
                    userId: game.userId
                }
            });
        }

    public addGame(data: Game): Promise<Game> {
        return new Promise<Game>((resolve, reject) => {
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
                    notifyCountdown: data.notifyCountdown,
                    approve: data.approve,
                    appToken: data.appToken
                }
            );

            game.save().then(() => resolve(game));
        });

    }

    public async getGames(userId: number): Promise<Game[]> {
        return await GamesModel.findAll({
            where: {
                userId
            }
        });
    }
}
