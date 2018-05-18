declare module '@community-app/quest-info' {
    export interface QuestInfo {
        id: number;
        name: string;
        registrationEventName: string;
        leaveEventName: string;
        getCountWaitPlayersEventName: string;
        maxRoomPlayer: number;
        requestUrl: string;
    }
}
