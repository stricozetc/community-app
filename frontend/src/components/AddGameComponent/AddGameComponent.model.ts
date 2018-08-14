import { AuthStatus, MyGameModel } from 'models';

export interface AddGameComponentState {
    appName: string;
    description: string;
    maxRoomPlayer: string;
    maxRooms: string;
    requestUrl: string;
    maxWaitingTime: string;
    redirectUrl: string;
}

export interface AddGameComponentProps {
    authStatus: AuthStatus;
    history: any;
    user: any;
    games: MyGameModel[];
    children?: JSX.Element;

    addGame (payload: MyGameModel): void;
}
