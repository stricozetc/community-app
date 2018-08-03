import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';

import Promise = require("bluebird");
import { inject } from 'inversify';

import {
    MyGamesRepository
  } from './../service/my-games';

import { MyGameInterface } from './../../models/games';

@controller('/api/v1/my-games')
export class MyGameController

{

    public constructor(@inject(MyGamesRepository) private myGameRepository: MyGamesRepository) {
    }

    @httpPost('/delete-game')
    public deleteGame(request: Request, response: Response): void {

        const data: MyGameInterface = request.body;

        this.myGameRepository.deleteGame(data);

    }

    @httpPost('/edit-game')
    public editGame(request: Request, response: Response): void {

        const data: MyGameInterface = request.body;

        this.myGameRepository.editGame(data);

    }

    @httpPost('/add-game')
    public addGame(request: Request, response: Response): Promise<void | Response> {

        const data: MyGameInterface = request.body;

        return this.myGameRepository.addGame(data)
        .then((game: MyGameInterface) => {
            return response.status(200).json(game);
        }).catch((err) => {
            return response.status(400).json(err);
        });
    }

    @httpGet('/get-games')
    public getGames(request: Request, response: Response): Promise<void | Response>  {

        return this.myGameRepository.getGames(request.query.userId)
        .then((games: MyGameInterface[]) => {
            response.status(200).json(games);
        }).catch((err) => {
            return response.status(400).json(err);
        });
    }
}
