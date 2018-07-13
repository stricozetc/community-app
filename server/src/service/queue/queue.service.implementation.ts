import { injectable, decorate, inject } from "inversify";

import { QueueService } from "./queue.service";
import { LoggerService } from "../logger";
import { Game } from "../../typing/game";

decorate(injectable(), QueueService);

@injectable()
export class QueueServiceImplementation extends QueueService {
  private queues: SocketIO.Socket[][] = [];
  private games: Game[] = require('../../config/games.json').games;
  @inject(LoggerService) private loggerService: LoggerService;

  constructor() {
    super();

    for (let index = 0; index < this.games.length; index++) {
      this.queues.push([]);
    }
  }

  public setNewPlayer(id: number, player: SocketIO.Socket): void {
    this.queues[id].push(player);
    this.checkWaitPlayersCount(id);
  }

  public deletePlayer(deletePlayer: SocketIO.Socket): void {
    this.queues = this.queues.map((queue: SocketIO.Socket[]) => {
      return queue.filter((player: SocketIO.Socket) => player !== deletePlayer);
    });
  }

  public deletePlayerFromQueue(id: number, deletePlayer: SocketIO.Socket): void {
    this.queues[id] = this.queues[id].filter((player: SocketIO.Socket) => player !== deletePlayer);
    this.checkWaitPlayersCount(id);
  }

  private checkWaitPlayersCount(id: number): void {
    if (this.queues[id].length === this.games[id].maxRoomPlayer) {
      this.queues[id].forEach((player: SocketIO.Socket) => {
        this.loggerService.infoLog(`12345 ${player.id}`);
        player.emit(this.games[id].updateRoomsInfoEventName, this.queues[id].length);
        this.loggerService.infoLog(`Sent count wait players in ${this.games[id].name}`);

        player.emit('redirect', this.games[id].redirectUrl);
        this.loggerService.infoLog(`Redirect players group to ${this.games[id].name}`);
      });
      this.queues[id] = [];
    } else {
      this.queues[id].forEach((player: SocketIO.Socket) => {
        player.emit(this.games[id].updateRoomsInfoEventName, this.queues[id].length);
        this.loggerService.infoLog(`Sent count wait players in ${this.games[id].name}`);
      });
    }
  }
}
