import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';

import { inject } from 'inversify';
import { AppTokenService, MyGamesRepository } from 'service';

import { Game } from 'models/games';
import { validateAppDataInput } from 'validation/register-app';

@controller('/api/v1/my-games')
export class MyGameController {

  public constructor(
    @inject(MyGamesRepository) private myGameRepository: MyGamesRepository,
    @inject(AppTokenService) private tokenService: AppTokenService) {
  }

   /**
    * @param {Request} request - data from request
    * @param {Game} request.body - information about the game you want to remove
    * return all games after changes if you successfully deleted the game
    */
  @httpPost('/delete-game')
  public async deleteGame(request: Request, response: Response): Promise<void | Response> {
    const gameThatNeedToDelete: Game = request.body;
    try {
      const games = await this.myGameRepository.deleteGame(gameThatNeedToDelete);
      return response.status(200).send(games);
    } catch (err) {
      return response.sendStatus(500);
    }
  }

   /**
    * @param {Request} request - data from request
    * @param {Game} request.body - information about the game you want to update
    * return all games after changes if you successfully edited the game
    */
  @httpPost('/edit-game')
  public async editGame(request: Request, response: Response): Promise<void | Response> {
    const data: Game = request.body;
    try {
      const games = await this.myGameRepository.editGame(data);
      return response.status(200).send(games);
    } catch (err) {
      return response.sendStatus(500);
    }
  }

   /**
    * @param {Request} request - data from request
    * @param {Game} request.body - information about the game you want to add
    * return info about the game if you successfully added the game
    */
  @httpPost('/add-game')
  public async addGame(request: Request, response: Response): Promise<void | Response> {
    let newGame: Game = request.body;

    const appToken = await this.tokenService.create(newGame);
    newGame = Object.assign({}, newGame, { appToken });

    const { errors, isValid } = validateAppDataInput(newGame);

    if (!isValid) {
      return response.status(400).json(errors);
    }
    try {
      const addedGame = await this.myGameRepository.addGame(newGame);
      return response.status(200).json(addedGame);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

   /**
    * @param {Request} request - data from request
    * @param {Game} request.query - data from request
    * @param {number} request.query.userId - id of the user who created the game
    * return array of games from db if the user created them with the passed id
    */
  @httpGet('/get-games')
  public async getGames(request: Request, response: Response): Promise<void | Response> {

    const userId: number = request.query.userId;
    try {
      const games = await this.myGameRepository.getGames(userId);
      return response.status(200).json(games);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}
