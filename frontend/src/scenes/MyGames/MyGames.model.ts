import { AuthStatus } from 'models';

export interface MyGameModel {
    id?: number;
    userId: number;
    appName: string;
    description: string;
    maxRoomPlayer: number;
    maxRooms: number;
    requestUrl: string;
    maxWaitingTime: number;
    createAt?: Date;
    updatedAt?: Date;
}

export interface MyGameProps {
    authStatus: AuthStatus;
    history: any;
    user: any;
    games: MyGameModel[];
    children?: JSX.Element;

    deleteGame (payload: MyGameModel | null): any;
    addGame (payload: MyGameModel):  any;
    getMyGames (payload: number):  any;

}

export interface  MyGameState {
    isDialogOpen: boolean;
    deletedGame: MyGameModel | null;
}
