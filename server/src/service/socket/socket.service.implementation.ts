import { injectable } from "inversify";
import * as SocketIO from 'socket.io';

import { inject } from "../services-registration";
import { SocketService } from "./socket.service";
import { QueueService } from "../queue";
import { LoggerService } from "../logger";
import { QuestInfo } from "../../typing/quest-info";

@injectable()
export class SocketServiceImplementation extends SocketService {
    private questsInfo: QuestInfo[] = require('../../config/quests.json').quests;
    @inject(LoggerService) private loggerService: LoggerService;
    @inject(QueueService) private queueService: QueueService;

    public setSocket(socketIO: SocketIO.Server): void {
        socketIO.on('connection', (client: SocketIO.Socket) => {
            this.loggerService.infoLog('Player connection opened');

            client.on('disconnect', () => {
                this.loggerService.infoLog('Player connection closed');
                this.queueService.deletePlayer(client);
            });

            for (let index = 0; index < this.questsInfo.length; index++) {
                client.on(this.questsInfo[index].registrationEventName,
                    () => {
                        this.queueService.setNewPlayer(this.questsInfo[index].id, client);
                        this.loggerService.infoLog(`Player registration on ${this.questsInfo[index].name}`);
                    });

                client.on(this.questsInfo[index].leaveEventName,
                    () => {
                        this.queueService.deletePlayerFromQueue(this.questsInfo[index].id, client);
                        this.loggerService.infoLog(`Player leave from ${this.questsInfo[index].name}`);
                    });
            }
        });
    }
} 
