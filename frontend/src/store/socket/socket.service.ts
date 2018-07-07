import * as openSocket from 'socket.io-client';

import { Subject } from 'rxjs/Subject';
import { Game } from 'models';

export class SocketService {
  public waitBattlePlayersCount: Subject<number> = new Subject();
  public notifyCountdown: Subject<number> = new Subject();

  private socket: SocketIOClient.Socket;

  public constructor() {
    this.socket = openSocket('http://localhost:3030');
  }

  public init(games: Game[]): void {
    for (const game of games) {
      this.socket.on(game.getWaitPlayersCountEventName,
        (waitBattlePlayersCount: number) => this.waitBattlePlayersCount.next(waitBattlePlayersCount));
      this.socket.on(game.notifyCountdown,
        (distance: number) => this.notifyCountdown.next(distance));
    }
  }

  public emitEvent(eventName: string): void {
    this.socket.emit(eventName);
  }

  public getRoomUrl(): Promise<string> {
    return new Promise((res, rej) => {
      this.socket.on('redirect', (redirectUrl: string) => res(redirectUrl));
    })
  }
}
