import { Game } from 'models/games';

export abstract class ApiService {
    public abstract getRoomUrl(requestUrl: string): Promise<string>;

    public abstract startNewRoom(requestUrl: string, data: any, game: Game): Promise<string>;
}
