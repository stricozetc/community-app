import { MyGamesRepository } from './my-games.repository';
import { injectable } from 'inversify';

// import Promise = require('bluebird');
// import { inject } from 'inversify';
// import { MyGamesService } from './my-games.service';

// import { GameData } from '../../controller/my-game.controller';
import { MyGameInterface, GamesModel } from '../../../models/games';
import Promise = require('bluebird');

@injectable()
export class MyGamesRepositoryImplementation implements MyGamesRepository {
    public deleteGame(data: MyGameInterface): void {
        console.log(`DELETE MyGamesRepositoryImplementation`);
        console.log(data);
    }

    public editGame(data: MyGameInterface): void {
        console.log(`EDIT MyGamesRepositoryImplementation`);
        console.log(data);
    }

    public addGame(data: MyGameInterface): Promise<MyGameInterface> {
        const game = GamesModel.build(
            {
                userId: data.userId,
                appName: data.appName,
                desc: data.desc,
                maxRoomPlayer: data.maxRoomPlayer,
                maxRooms: data.maxRooms,
                requestUrl: data.requestUrl,
                maxWaitingTime: data.maxWaitingTime
            }
        );

        return game.save();
    }

    public getGames(userId: number): Promise<MyGameInterface[]> {
        return GamesModel.findAll({
            where: {
                userId
            }
        });
    }
}
