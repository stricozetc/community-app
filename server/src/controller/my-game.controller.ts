import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';

import Promise = require("bluebird");
import { inject } from 'inversify';
import { AppTokenService } from './../service/app-token';
import {
    MyGamesRepository
} from './../service/my-games';

import { MyGameInterface } from './../../models/games';
import { validateAppDataInput } from '../validation/register-app';


@controller('/api/v1/my-games')
export class MyGameController {

    public constructor(
        @inject(MyGamesRepository) private myGameRepository: MyGamesRepository,
        @inject(AppTokenService) private tokenService: AppTokenService) {
    }

    @httpPost('/delete-game')
    public deleteGame(request: Request, response: Response): Promise<void | Response> {
        const gameThatNeedToDelete: MyGameInterface = request.body;

        return this.myGameRepository.deleteGame(gameThatNeedToDelete)
            .then((games: MyGameInterface[]) => {
                return response.status(200).send(games);
            }).catch((err) => {
                return response.sendStatus(500);
            });

    }

    @httpPost('/edit-game')
    public editGame(request: Request, response: Response): Promise<void | Response> {

        const data: MyGameInterface = request.body;

        return this.myGameRepository.editGame(data)
            .then((games: MyGameInterface[]) => {
                return response.status(200).send(games);
            }).catch((err) => {
                return response.sendStatus(500);
            });
    }

    @httpPost('/add-game')
    public addGame(request: Request, response: Response): Promise<void | Response> | Response {
        const newGame: MyGameInterface = request.body;

        this.tokenService.create(newGame);
        const { errors, isValid } = validateAppDataInput(newGame);

        if (!isValid) {
            return response.status(400).json(errors);
        }

        return this.myGameRepository.addGame(newGame)
            .then((addedGame: MyGameInterface) => {
                return response.status(200).json(addedGame);
            }).catch((err) => {
                return response.status(400).json(err);
            });
    }

    @httpGet('/get-games')
    public getGames(request: Request, response: Response): Promise<void | Response> {

        const userId: number = request.query.userId;

        return this.myGameRepository.getGames(userId)
            .then((games: MyGameInterface[]) => {
                response.status(200).json(games);
            }).catch((err) => {
                return response.status(400).json(err);
            });
    }
}
