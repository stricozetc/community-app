export interface Game {
  id: number;
  name: string;
  desc: string;
  registrationEventName: string;
  leaveEventName: string;
  updateRoomsInfoEventName: string;
  maxRoomPlayer: number;
  maxRooms: number;
  requestUrl: string;
  maxWaitingTime: number;
  notifyCountdown: string;
  battleTime: number;
}
