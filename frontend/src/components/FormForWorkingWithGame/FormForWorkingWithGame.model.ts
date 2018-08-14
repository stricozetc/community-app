import { MyGameModel } from 'models';

export interface FormForAddingNewGameState {
    appName: string;
    description: string;
    maxRoomPlayer: number;
    maxRooms: number;
    requestUrl: string;
    maxWaitingTime: number;
    redirectUrl: string;
    registrationEventName?: string;
    leaveEventName?: string;
    updateRoomsInfoEventName?: string;
    notifyCountdown?: string;
}

export interface FormForAddingNewGameProps {
    id: number;
    userId: number;
    config: string;
    model: MyGameModel;
    submit (payload: MyGameModel): void;
}
