import * as openSocket from 'socket.io-client';

import { Subject } from 'rxjs/Subject';

export class SocketService {
    public waitBattlePlayersCount: Subject<number> = new Subject();

    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = openSocket('http://localhost:3030');

        this.socket.on('onWaitPlayersJsMarathon', (waitBattlePlayersCount: number) => this.waitBattlePlayersCount.next(waitBattlePlayersCount));
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