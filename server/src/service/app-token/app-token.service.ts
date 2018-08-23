import { inject, injectable } from 'inversify';
import { AppTokenRepository } from './app-token.repository';
import { Game } from 'models/games';
@injectable()
export class AppTokenService {

    public constructor(@inject(AppTokenRepository) private appTokenRepository: AppTokenRepository) {
    }

    public create(app: Game): Promise<string> {
        return this.appTokenRepository.create(app);
    }

    public async getByAppName(gameName: string): Promise<Game> {
        return this.appTokenRepository.getByName(gameName);
    }
}
