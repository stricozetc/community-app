export interface FormForAddingNewGameState {
    appName: string;
    description: string;
    maxRoomPlayer: string;
    maxRooms: string;
    requestUrl: string;
    maxWaitingTime: string;
}

export const initFormForAddingNewGame: FormForAddingNewGameState = {
    appName: '',
    description: '',
    maxRoomPlayer: '',
    maxRooms: '',
    requestUrl: '',
    maxWaitingTime: ''
};