import uuid from 'uuid/v4';
import { injectable, inject } from 'inversify';
import { logicErr, technicalErr } from 'errors';
import { LoggerService } from '../logger/logger.service';
import { Game, GamesModel } from 'models/games';

@injectable()
export class AppTokenRepository {

    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
    ) { }

    public async create(app: Game): Promise<string> {
        const token = await this.getByName(app.appName);

        if (token) {
            throw logicErr.appNameIsAlreadyRegistered;
        }

        try {
            const newToken = uuid();

            if (newToken) {
                return newToken;
            } else {
                throw technicalErr.applicationTokenIsNotUpsertedInDb;
            }
        } catch (error) {
            if (!error.code) {
                this.loggerService.errorLog(error);
                throw technicalErr.databaseCrash;
            } else {
                throw error;
            }
        }
    }

    public async getByName(gameName: string): Promise<Game> {
        try {
            return await GamesModel.findOne({
                where: { appName: gameName }
            });
        } catch (error) {
            this.loggerService.errorLog(error);
            throw technicalErr.databaseCrash;
        }
    }
}
