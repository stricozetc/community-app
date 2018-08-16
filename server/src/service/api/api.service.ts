// import { Game } from '../../typing/game';
import { MyGameInterface } from '../../../models/games';


export abstract class ApiService {
    public abstract getRoomUrl(requestUrl: string): Promise<string>;

    public abstract startNewRoom(requestUrl: string, data: any, game: MyGameInterface): Promise<string>;
}
