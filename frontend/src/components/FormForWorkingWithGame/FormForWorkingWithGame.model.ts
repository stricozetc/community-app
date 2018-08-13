import { MyGameModel } from 'models';

export interface FormForAddingNewGameState {
    appName: string;
    description: string;
    maxRoomPlayer: number;
    maxRooms: number;
    requestUrl: string;
    maxWaitingTime: number;
}

export interface FormForAddingNewGameProps {
    userId: number;
    config: string;
    model: MyGameModel; 
}
