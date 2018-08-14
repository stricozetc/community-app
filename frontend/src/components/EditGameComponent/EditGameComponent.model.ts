import { AuthStatus, MyGameModel } from 'models';
export interface EditGameComponentState {
    appName: string;
    description: string;
    maxRoomPlayer: string;
    maxRooms: string;
    requestUrl: string;
    maxWaitingTime: string;
}

export interface EditGameComponentProps {
    authStatus: AuthStatus;
    history: any;
    user: any;
    games: MyGameModel[];
    children?: JSX.Element;
    match: any;

    editGame (payload: MyGameModel): void;
}

export interface NecessaryPropertyOfTheGameForEditForm {
    appName: string;
    description: string;
    maxRoomPlayer: number;
    maxRooms: number;
    requestUrl: string;
    maxWaitingTime: number;
}