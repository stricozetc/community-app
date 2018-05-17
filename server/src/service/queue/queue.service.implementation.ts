import { injectable } from "inversify";

import { QuestInfo } from "@community-app/quest-info";

import { QueueService } from "./queue.service";

@injectable()
export class QueueServiceImplementation extends QueueService {
    private queues: SocketIO.Socket[][] = [];
    private questsInfo: QuestInfo[] = require('../../config/quests.json').quests;

    constructor() {
        //ToDo: Fix 
        super();

        for (let index = 0; index < this.questsInfo.length; index++) {
            this.queues.push([]);
        }
    }

    public setNewPlayer(id: number, player: SocketIO.Socket): void {
        this.queues[id].push(player);
        this.checkCountWaitPlayers(id);
    }

    public deletePlayer(deletePlayer: SocketIO.Socket): void {
        this.queues = this.queues.map((queue: SocketIO.Socket[]) => {
            return queue.filter((player: SocketIO.Socket) => player !== deletePlayer);
        });
    }

    private checkCountWaitPlayers(id: number): void {
        let maxRoomPlayer = this.questsInfo[id].maxRoomPlayer;
        console.log(this.queues[id].length);
        if (this.queues[id].length === maxRoomPlayer) {

            this.queues[id].forEach((player: SocketIO.Socket) => {
                player.emit('redirect', 'http://localhost:2018');
            });
            this.queues[id] = [];
        }
    }
}
