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
    isAppNameValid: boolean;
    isDescriptionValid: boolean;
    isMaxRoomPlayerValid: boolean;
    isMaxRoomsValid: boolean;
    isRequestUrlValid: boolean;
    isMaxWaitingTimeValid: boolean;
    isRedirectUrlValid: boolean;
    touched: {
        appName: boolean;
        description: boolean;
        maxRoomPlayer: boolean;
        maxRooms: boolean;
        requestUrl: boolean;
        maxWaitingTime: boolean;
        redirectUrl: boolean;
    };
    appNameErrors: string[];
    descriptionErrors?: string[];
    maxRoomPlayerErrors?: string[];
    maxRoomsErrors?: string[];
    requestUrlErrors?: string[];
    maxWaitingTimeErrors?: string[];
    redirectUrlErrors?: string[];
}

export interface GameFormProps {
    id?: number;
    userId: number;
    config: SettingFormType;
    model: GameForSettingForm;
    submit(payload: GameModel): void;
}
