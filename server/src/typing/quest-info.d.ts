export interface QuestInfo {
    id: number;
    name: string;
    registrationEventName: string;
    leaveEventName: string;
    getWaitPlayersCountEventName: string;
    maxRoomPlayer: number;
    requestUrl: string;
    maxWaitingTime: number;
    notifyCountdown: string;
}
