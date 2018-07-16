import { Game } from '../../typing/game';

export abstract class ApiService {
    public abstract getRoomUrl(requestUrl: string): Promise<string>;

    public abstract startNewRoom(requestUrl: string, data: any, game: Game): Promise<string>;
}
