import { injectable } from 'inversify';
import * as SocketIO from 'socket.io';

import { inject } from '../services-registration';
import { SocketService } from './socket.service';
import { LoggerService } from '../logger';
import { Game } from '../../typing/game';
import { RoomService } from '../room';
import { RoomInfo } from '../../typing/room-info';

@injectable()
export class SocketServiceImplementation extends SocketService {
  private games: Game[] = require('../../config/games.json').games;
  @inject(LoggerService) private loggerService: LoggerService;
  @inject(RoomService) private roomService: RoomService;

  private clients: SocketIO.Socket[] = [];
  private playersSocketBind: { playerToken: string, playerSocketId: string }[] = [];

  public setSocket(socketIO: SocketIO.Server): void {
    socketIO.on('connection', (client: SocketIO.Socket) => {
      this.loggerService.infoLog('Player connection opened');
      this.clients.push(client);
      this.loggerService.infoLog(`Count of clients = ${this.clients.length}`);

      client.on('disconnect', () => this.onDisconnect(client));

      for (let index = 0; index < this.games.length; index++) {
        client.on(this.games[index].registrationEventName, (token: string) => {
          this.addNewPlayer(client, token);
          console.log('TOKEN', token);
          this.onRegister(index, client, token);
        });
        client.on(this.games[index].leaveEventName, () => this.onLeave(index, client));
        client.on('onClientInitialized', () => {
          this.loggerService.infoLog(` -> onClientInitialized`);
          client.emit(this.games[index].updateRoomsInfoEventName, this.mapRoomsToRoomsInfo());
        });
      }
    });
  }

  public notifyAllClients(eventName: string, payload: RoomInfo[]): void {
    this.clients.forEach(client => {
      client.emit(eventName, payload);
    });
  }

  private onRegister(index: number, client: SocketIO.Socket, token: string): void {
    this.roomService.addPlayerToRoom(index, client, token)
      .then(([isAdded, room]) => {
        this.loggerService.infoLog(`isAdded -> ${isAdded}`);

        if (isAdded) {
          this.loggerService.infoLog(`Player registration on ${this.games[index].name}`);

          this.loggerService.infoLog(`Sent count wait players in ${this.games[index].name}`);
          this.notifyAllClients(this.games[index].updateRoomsInfoEventName, this.mapRoomsToRoomsInfo());

          client.emit(this.games[index].notifyCountdown, room.distance);
        }

      })
      .catch((error: Error) => {
        this.loggerService.infoLog(error.message);
      });
  }

  private onLeave(index: number, client: SocketIO.Socket): void {
    this.roomService.removePlayerFromRoom(index, client, this.getPlayerToken(client))
      .then(([isRemoved, room]) => {
        this.loggerService.infoLog(`isRemoved -> ${isRemoved}`);

        if (isRemoved) {
          this.loggerService.infoLog(`Player leave from ${this.games[index].name}`);

          this.loggerService.infoLog(`Sent count wait players in ${this.games[index].name}`);
          this.notifyAllClients(this.games[index].updateRoomsInfoEventName,
            this.mapRoomsToRoomsInfo()
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
    this.loggerService.infoLog(`Count of clients = ${this.clients.length}`);

    this.roomService.removePlayer(client, this.getPlayerToken(client))
      .then(([isRemoved, room]) => {
        this.loggerService.infoLog(`isRemoved -> ${isRemoved}`);

        if (isRemoved && room) {
          this.loggerService.infoLog(`Sent count wait players in ${this.games[room.id].name}`);
          this.notifyAllClients(this.games[room.id].updateRoomsInfoEventName,
            this.mapRoomsToRoomsInfo()
          );
        }
      })
      .catch((error: Error) => {
        this.loggerService.infoLog(error.message);
      });
  }

  private mapRoomsToRoomsInfo(): RoomInfo[] {
    return this.roomService.getRooms().map(r => {
      return {
        id: r.id,
        gameId: r.gameId,
        distance: r.distance,
        maxPlayersCount: r.maxPlayersCount,
        playersCount: r.players.length,
        status: r.status
      } as RoomInfo;
    });
  }


  private addNewPlayer(socket: SocketIO.Socket, playerToken: string): void {
    this.playersSocketBind.push({ playerToken: playerToken, playerSocketId: socket.id });
  }

  private getPlayerToken(socket: SocketIO.Socket): string {
    const playerSocketBind = this.playersSocketBind
      .find((s) => s.playerSocketId === socket.id);

    if (playerSocketBind) {
      const token: string = playerSocketBind.playerToken;

      this.playersSocketBind = this.playersSocketBind
        .filter((s) => s.playerSocketId !== socket.id);

      return token;
    } else {
      this.loggerService.infoLog(`Couldn't find player's socket bind`);

      return null;
    }
  }
}
