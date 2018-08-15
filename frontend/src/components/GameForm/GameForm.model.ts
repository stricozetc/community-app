import { GameForSettingForm, GameModel, SettingFormType } from 'models';

export interface GameFormState {
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

export interface GameFormProps {
    id: number;
    userId: number;
    config: SettingFormType;
    model: GameForSettingForm;
    submit (payload: GameModel): void;
}
