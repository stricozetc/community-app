import * as openSocket from 'socket.io-client';

import {Subject} from 'rxjs/Subject';
import {Game, RoomInfo} from 'models';

export class SocketService {
  public roomsInfo: Subject<RoomInfo[]> = new Subject();
  public notifyCountdown: Subject<number> = new Subject();

  private socket: SocketIOClient.Socket;

  public constructor() {
    this.socket = openSocket('http://localhost:3030');
  }

  public init(games: Game[]): void {
    for (const game of games) {
      this.socket.on(
        game.updateRoomsInfoEventName,
        (roomsInfo: RoomInfo[]) => this.roomsInfo.next(roomsInfo)
      );
      this.socket.on(
        game.notifyCountdown,
        (distance: number) => this.notifyCountdown.next(distance)
      );
    }
  }

  public emitEvent(eventName: string): void {
    this.socket.emit(eventName);
  }

  public getRoomUrl(): Promise<string> {
    return new Promise((res, rej) => {
      this.socket.on('redirect', (redirectUrl: string) => res(redirectUrl));
    });
  }
}
