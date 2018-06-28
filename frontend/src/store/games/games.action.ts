import { action } from '../decorators';
import { Game } from './../../components/GameCard/GameCard.model';

export enum GamesTypes {
    InitGames = '[game] Init Game',
    GamesInited = '[game] Games Inited',
}

@action()
export class InitGames {
    public readonly type = GamesTypes.InitGames;

}

@action()
export class GamesInited {
    public readonly type = GamesTypes.GamesInited;

    constructor(public payload: Game[]) { }
}


export type GamesActions = 
    | GamesInited
    | InitGames ;
  

