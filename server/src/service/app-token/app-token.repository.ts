import * as uuid from 'uuid/v4';
import { injectable } from 'inversify';
import { AppData } from '../../../Interfaces/AppData';
import { AppTokenModel } from '../../../models/appToken';
import { AppToken } from '../../../Interfaces/AppToken';


@injectable()
export class AppTokenRepository {
    public create(app: AppData): Promise<string> {
        return new Promise((resolve: (value?: string | PromiseLike<string>) => void, reject: (reason?: any) => void) => {
            const newToken = uuid();

            AppTokenModel.upsert({
                token: newToken,
                appName: app.name,
                createAt: Date.now(),
                updatedAt: Date.now()
            }).then((isUpsert: boolean) => {
                if (isUpsert) {
                    resolve(newToken);
                } else {
                    reject("Error in token creation!");
                }
            }).catch(e => {
                reject(e);
            });
        });
    }

    public async getByName(gameName: string): Promise<AppToken> {
        let app = await AppTokenModel.findOne({
            where: {appName: gameName}
        });

        return app;
    }

    public async getByToken(tokenName: string): Promise<AppToken> {
        let app = await AppTokenModel.findOne({
            where: {token: tokenName}
        });

        return app;
    }
}
