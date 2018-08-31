import { RoomInfo } from 'models';
import { action } from 'store/decorators';

export enum RoomActionTypes {
  SetRooms = '[room] Set Rooms',
  SetRoomsError = '[room] Set Rooms (Error)',
  SetPlayerRoom = '[room] Set Player Room',
  SetGameId = '[room] Set Game Id',
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

export type RoomActions =
  | SetRooms
  | SetRoomsError
  | SetPlayerRoom
  | SetGameId;
