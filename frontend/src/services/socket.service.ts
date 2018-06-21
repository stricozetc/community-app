import * as openSocket from 'socket.io-client';

import { Subject } from 'rxjs/Subject';

import { QuestInfo } from 'models';

export class SocketService {
    public waitBattlePlayersCount: Subject<number> = new Subject();

    private socket: SocketIOClient.Socket;
    private questsInfo: QuestInfo[] = require('../config/quests.json').quests;

    constructor() {
        this.socket = openSocket('http://localhost:3030');

        for (const questInfo of this.questsInfo) {
            this.socket.on(questInfo.getWaitPlayersCountEventName,
                (waitBattlePlayersCount: number) => this.waitBattlePlayersCount.next(waitBattlePlayersCount));
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
