import { inject, injectable } from "inversify";
import * as SocketIO from 'socket.io';

import { QuestInfo } from "@community-app/quest-info";

import { SocketService } from "./socket.service";
import { QueueService } from "../queue";
import { LoggerService } from "../logger";

@injectable()
export class SocketServiceImplementation extends SocketService {
    private questsInfo: QuestInfo[] = require('../../config/quests.json').quests;

    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(QueueService) private queueService: QueueService
    ) {
        super();
    }

    public connection(serverInstance: any): void {
        const socketIO = SocketIO(serverInstance);

        socketIO.on('connection', (client: SocketIO.Socket) => {
            this.loggerService.log('Player connection opened');

            client.on('disconnect', () => {
                this.loggerService.log('Player connection closed');
                this.queueService.deletePlayer(client);
            });

            for (let index = 0; index < this.questsInfo.length; index++) {
                client.on(this.questsInfo[index].registrationEventName,
                    () => {
                        this.queueService.setNewPlayer(this.questsInfo[index].id, client);
                        this.loggerService.log(`Player registration on ${this.questsInfo[index].name}`);
                    });

                client.on(this.questsInfo[index].leaveEventName,
                    () => {
                        this.queueService.deletePlayerFromQueue(this.questsInfo[index].id, client);
                        this.loggerService.log(`Player leave from ${this.questsInfo[index].name}`);
                    });
            }
        });
    }
} 
