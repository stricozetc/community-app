import { SocketService } from "./socket.service";
import { inject, injectable } from "inversify";
import { QueueService } from "../queue";
import { QuestInfo } from "@community-app/quest-info";
import * as SocketIO from 'socket.io';

@injectable()
export class SocketServiceImplementation extends SocketService {
    private questsConfig: QuestInfo[] = require('../../config/quests.json').quests;

    constructor(@inject(QueueService) private queueService: QueueService) {
        super();
    }

    public connection(serverInstance: any): void {
        const socketIO = SocketIO(serverInstance);
        socketIO.on('connection', (client: SocketIO.Socket) => {
            console.log('Player connection opened');

            client.on('disconnect', () => {
                console.log('Player connection closed');
                this.queueService.deletePlayer(client);
            });

            for (let index = 0; index < this.questsConfig.length; index++) {
                client.on(this.questsConfig[index].eventName,
                    () => this.queueService.setNewPlayer(this.questsConfig[index].id, client));
            }
        });
    }
} 
