import { injectable } from 'inversify';
import * as SocketIO from 'socket.io';

import { inject } from '../services-registration';
import { SocketService } from './socket.service';
// import { QueueService } from '../queue';
import { LoggerService } from '../logger';
import { QuestInfo } from '../../typing/quest-info';
import { RoomService } from './../room';

@injectable()
export class SocketServiceImplementation extends SocketService {
    private questsInfo: QuestInfo[] = require('../../config/quests.json').quests;
    @inject(LoggerService) private loggerService: LoggerService;
    // @inject(QueueService) private queueService: QueueService;
    @inject(RoomService) private roomService: RoomService;

    private clients: SocketIO.Socket[] = [];

    public setSocket(socketIO: SocketIO.Server): void {
        socketIO.on('connection', (client: SocketIO.Socket) => {
            this.loggerService.infoLog('Player connection opened');
            this.clients.push(client);
            this.loggerService.infoLog(`Count of clients = ${ this.clients.length}`);

            client.on('disconnect', () => this.onDisconnect(client));

            let room;

            for (let index = 0; index < this.questsInfo.length; index++) {
                client.on(this.questsInfo[index].registrationEventName, () => this.onRegister(index, client));
                client.on(this.questsInfo[index].leaveEventName, () => this.onLeave(index, client));

                room = this.roomService.getRoomByIndex(index);

                if (room) {
                    client.emit(this.questsInfo[index].getWaitPlayersCountEventName, room.players.length);
                }
            }
        });
    }

    public notifyAllClients(eventName: string, payload: any): void {
        this.clients.forEach(client => {
            client.emit(eventName, payload);
        });
    }

    private onRegister(index: number, client: SocketIO.Socket): void {
        this.roomService.addPlayerToRoom(index, client)
            .then(([isAdded, room]) => {
                this.loggerService.infoLog(`isAdded -> ${isAdded}`);

                if (isAdded) {
                    // this.queueService.setNewPlayer(this.questsInfo[index].id, client);
                    this.loggerService.infoLog(`Player registration on ${this.questsInfo[index].name}`);

                    this.loggerService.infoLog(`Sent count wait players in ${this.questsInfo[index].name}`);
                    this.notifyAllClients(this.questsInfo[index].getWaitPlayersCountEventName, room.players.length);

                    client.emit(this.questsInfo[index].notifyCountdown, room.distance);
                }

            })
            .catch((error: Error) => {
                this.loggerService.infoLog(error.message);
            });
    }

    private onLeave(index: number, client: SocketIO.Socket): void {
        this.roomService.removePlayerFromRoom(index, client)
            .then(([isRemoved, room]) => {
                this.loggerService.infoLog(`isRemoved -> ${isRemoved}`);

                if (isRemoved) {
                    //  this.queueService.deletePlayerFromQueue(this.questsInfo[index].id, client);
                    this.loggerService.infoLog(`Player leave from ${this.questsInfo[index].name}`);

                    this.loggerService.infoLog(`Sent count wait players in ${this.questsInfo[index].name}`);
                    this.notifyAllClients(this.questsInfo[index].getWaitPlayersCountEventName,
                        room && room.players ? room.players.length : 0
                    );
                }

            })
            .catch((error: Error) => {
                this.loggerService.infoLog(error.message);
            });
    }

    private onDisconnect(client: SocketIO.Socket): void {
        this.loggerService.infoLog('Player connection closed');
        this.clients.splice(this.clients.indexOf(client), 1);
        this.loggerService.infoLog(`Count of clients = ${ this.clients.length}`);

        this.roomService.removePlayer(client)
            .then(([isRemoved, room]) => {
                this.loggerService.infoLog(`isRemoved -> ${isRemoved}`);

                if (isRemoved) {
                    // this.queueService.deletePlayer(client);

                    if (room) {
                        this.loggerService.infoLog(`Sent count wait players in ${this.questsInfo[room.id].name}`);
                        this.notifyAllClients(this.questsInfo[room.id].getWaitPlayersCountEventName,
                            room && room.players ? room.players.length : 0
                        );
                    }
                }
            })
            .catch((error: Error) => {
                this.loggerService.infoLog(error.message);
            });
    }
}
