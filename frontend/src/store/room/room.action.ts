import { RoomInfo } from 'models';
import { action } from 'store/decorators';

export enum RoomActionTypes {
  SetRoomsInfo = '[room] Set Rooms Info',
  SetRoomsInfoError = '[room] Set Rooms Info (Error)',
}

@action()
export class SetRoomsInfo {
  public readonly type = RoomActionTypes.SetRoomsInfo;

  constructor(public payload: RoomInfo[]) { }
}

@action()
export class SetRoomsInfoError {
  public readonly type = RoomActionTypes.SetRoomsInfoError;
}

export type RoomActions =
  | SetRoomsInfo
  | SetRoomsInfoError;
