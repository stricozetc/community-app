import { RoomInfo } from 'models';
import { action } from 'store/decorators';

export enum RoomActionTypes {
  SetRoomsInfo = '[room] Set Rooms Info',
}

@action()
export class SetRoomsInfo {
  public readonly type = RoomActionTypes.SetRoomsInfo;

  constructor(public payload: RoomInfo[]) { }
}

export type RoomActions =
  | SetRoomsInfo;
