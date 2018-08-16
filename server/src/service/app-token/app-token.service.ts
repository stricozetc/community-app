import { inject, injectable } from 'inversify';
import { AppData } from '../../../Interfaces/AppData';
import { AppTokenRepository } from './app-token.repository';
import { AppToken } from '../../../Interfaces/AppToken';
import { ErrorBlock } from '../../../models/error';
import { MyGameInterface } from '../../../models/games';
@injectable()
export class AppTokenService {

    public constructor(@inject(AppTokenRepository) private appTokenRepository: AppTokenRepository) {
    }

    public create(app: MyGameInterface): Promise<string> {
        return this.appTokenRepository.create(app);
    }

    public async getByAppName(gameName: string): Promise<AppToken> {
        return this.appTokenRepository.getByName(gameName);
    }
}
