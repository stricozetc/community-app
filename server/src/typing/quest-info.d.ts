declare module '@community-app/quest-info' {
    export interface QuestInfo {
        id: number;
        name: string;
        registrationEventName: string;
        leaveEventName: string;
        getWaitPlayersCountEventName: string;
        maxRoomPlayer: number;
        requestUrl: string;
    }
}
