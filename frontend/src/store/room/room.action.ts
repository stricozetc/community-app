import { RoomInfo } from 'models';
import { action } from 'store/decorators';

export enum RoomActionTypes {
  SetRooms = '[room] Set Rooms',
  SetRoomsError = '[room] Set Rooms (Error)',
  SetPlayerRoom = '[room] Set Player Room',
  SetGameId = '[room] Set Game Id',
  JoinRoom = '[room] Join Room',
  RedirectToGameRoom = '[room] Redirect To Game Room',
  LeaveRoom = '[room] Leave Room',
  NotifyCountdown = '[room] Notify Countdown',
  ErrorRoom = '[room] Error Room'
}

@action()
export class SetRooms {
  public readonly type = RoomActionTypes.SetRooms;

  constructor(public payload: RoomInfo[]) { }
}

@action()
export class SetRoomsError {
  public readonly type = RoomActionTypes.SetRoomsError;
}

@action()
export class SetPlayerRoom {
  public readonly type = RoomActionTypes.SetPlayerRoom;

  constructor(public payload: RoomInfo) { }
}

@action()
export class SetGameId {
  public readonly type = RoomActionTypes.SetGameId;

  constructor(public payload: number) { }
}

@action()
export class JoinRoom {
  public readonly type = RoomActionTypes.JoinRoom;

  constructor(public payload: string) { }
}

@action()
export class RedirectToGameRoom {
  public readonly type = RoomActionTypes.RedirectToGameRoom;

  constructor(public payload: string) { }
}

@action()
export class LeaveRoom {
  public readonly type = RoomActionTypes.LeaveRoom;

  constructor(public payload: string) { }
}

@action()
export class NotifyCountdown {
  public readonly type = RoomActionTypes.NotifyCountdown;

  constructor(public payload: number) { }
}

@action()
export class ErrorRoom {
  public readonly type = RoomActionTypes.ErrorRoom;
}

export type RoomActions =
  | SetRooms
  | SetRoomsError
  | SetPlayerRoom
  | SetGameId
  | JoinRoom
  | RedirectToGameRoom
  | LeaveRoom
  | NotifyCountdown
  | ErrorRoom;
