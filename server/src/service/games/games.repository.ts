import { Game } from 'models/games';

export abstract class GamesRepository {
    public abstract getGames(): Promise<Game[]>;
}
