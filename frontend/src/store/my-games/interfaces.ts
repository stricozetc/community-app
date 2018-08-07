import { LoadStatus} from 'models';

export interface MyGamesState {
    myGames: any[];
    myGamesStatus: LoadStatus;
    editGameStatus: LoadStatus;
    deleteGameStatus: LoadStatus;
    addGameStatus: LoadStatus;
}

export interface MyGameModel {
    userId: number;
    appName: string;
    description: string;
    maxRoomPlayer: number;
    maxRooms: number;
    requestUrl: string;
    maxWaitingTime: number;
}