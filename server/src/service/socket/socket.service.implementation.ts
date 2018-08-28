import { injectable } from 'inversify';
import SocketIO from 'socket.io';

import { inject } from '../services-registration';
import { SocketService } from './socket.service';
import { LoggerService } from '../logger';
import { RoomService } from '../room';
import { RoomInfo } from 'typing/room-info';
import { Game } from 'models/games';
import { GamesRepository } from '../games/games.repository';

@injectable()
export class SocketServiceImplementation implements SocketService {
  private static instance: SocketServiceImplementation;
  @inject(LoggerService) private loggerService: LoggerService;
  @inject(RoomService) private roomService: RoomService;
  @inject(GamesRepository) private gamesRepository: GamesRepository;
  private games: Game[];
  private clients: SocketIO.Socket[] = [];
  private playersSocketBind: Array<{ playerToken: string, playerSocketId: string }> = [];
  public static getInstance() {
    if (!SocketServiceImplementation.instance) {
      SocketServiceImplementation.instance = new SocketServiceImplementation();
        // ... any one time initialization goes here ...
    }
    return SocketServiceImplementation.instance;
}
  public async setSocket(socketIO: SocketIO.Server): Promise<void | Response> {

    this.games = await this.gamesRepository.getGames().map((game: any) => game.dataValues);

    socketIO.on('connection', (client: SocketIO.Socket) => {
      this.loggerService.infoLog('Player connection opened');
      this.clients.push(client);
      this.loggerService.infoLog(`Count of clients = ${this.clients.length}`);

      client.on('disconnect', () => this.onDisconnect(client));

      for (let index = 0; index < this.games.length; index++) {

        client.on(this.games[index].registrationEventName, (token: string) => {
          this.addNewPlayer(client, token);
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

  public notifyAllClients(eventName: string, payload: RoomInfo[] | string): void {
    this.clients.forEach((client) => {
      client.emit(eventName, payload);
    });
  }

  private onRegister(index: number, client: SocketIO.Socket, token: string): void {
    this.roomService.addPlayerToRoom(index, client, token)
      .then(([isAdded, room]) => {
        this.loggerService.infoLog(`isAdded -> ${isAdded}`);

        if (isAdded) {
          this.loggerService.infoLog(`Player registration on ${this.games[index].appName}`);

          this.loggerService.infoLog(`Sent count wait players in ${this.games[index].appName}`);
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
          this.loggerService.infoLog(`Player leave from ${this.games[index].appName}`);

          this.loggerService.infoLog(`Sent count wait players in ${this.games[index].appName}`);
          this.notifyAllClients(this.games[index].updateRoomsInfoEventName, this.mapRoomsToRoomsInfo());
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
          this.loggerService.infoLog(`Sent count wait players in ${this.games[room.id].appName}`);
          this.notifyAllClients(this.games[room.id].updateRoomsInfoEventName, this.mapRoomsToRoomsInfo());
        }
      })
      .catch((error: Error) => {
        this.loggerService.infoLog(error.message);
      });
  }

  private mapRoomsToRoomsInfo(): RoomInfo[] {
    return this.roomService.getRooms().map((r) => {
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
    this.playersSocketBind.push({ playerToken, playerSocketId: socket.id });
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
