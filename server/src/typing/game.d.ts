export interface Game {
    id: number;
    appName: string;
    name: string;
    desc: string;
    registrationEventName: string;
    leaveEventName: string;
    updateRoomsInfoEventName: string;
    maxRoomPlayer: number;
    maxRooms: number;
    requestUrl: string;
    redirectUrl: string;
    maxWaitingTime: number;
    notifyCountdown: string;
    battleTime: number;
}
