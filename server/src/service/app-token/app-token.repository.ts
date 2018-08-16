import * as uuid from 'uuid/v4';
import { injectable, inject } from 'inversify';
import { AppData } from '../../../Interfaces/AppData';
import { AppTokenModel } from '../../../models/appToken';
import { AppToken } from '../../../Interfaces/AppToken';
import { technicalErr } from '../../../errors/technicalErr';
import { logicErr } from '../../../errors/logicErr';
import { LoggerService } from '../logger/logger.service';
import { MyGameInterface } from '../../../models/games';


@injectable()
export class AppTokenRepository {

    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
    ) { }

    public async create(app: MyGameInterface): Promise<string> {
        const token = await this.getByName(app.appName);

        if (token) {
            throw logicErr.appNameIsAlreadyRegistered;
        }

        try {
            const newToken = uuid();
            const isUpsert: boolean = await AppTokenModel.upsert({
                token: newToken,
                appName: app.appName,
                createAt: Date.now(),
                updatedAt: Date.now()
            });

            if (isUpsert) {
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

    public async getByName(gameName: string): Promise<AppToken> {
        try {
            return await AppTokenModel.findOne({
                where: { appName: gameName }
            });
        } catch (error) {
            this.loggerService.errorLog(error);
            throw technicalErr.databaseCrash;
        }
    }
}
