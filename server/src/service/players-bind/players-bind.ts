import { injectable, inject } from 'inversify';
import { Room } from '../room/models';
import axios from 'axios';
import { Game } from '../../typing/game';
import { AppTokenService } from '../app-token';

@injectable()
export class PlayersBindService {
  private playersBinds: PlayersBind[] = [];

  constructor(
    @inject(AppTokenService) private tokenService: AppTokenService
  ) { }

  public getPlayersBinds(): PlayersBind[] {
    return this.playersBinds;
  }

  public getPlayersBindByRoom(room: string): PlayersBind {
    return this.playersBinds.find((playersBind: PlayersBind) => playersBind.room === room);
  }

  public bindPlayer(room: string, bindPlayer: string): void {
    let playersBindIndex = this.playersBinds.findIndex((playersBind: PlayersBind) => playersBind.room === room);

    if (playersBindIndex === -1) {
      this.playersBinds.push({ room: room, players: [bindPlayer] });
    } else {
      this.playersBinds[playersBindIndex].players.push(bindPlayer);
    }
  }

  public removePlayers(room: string, removePlayer: string): void {
    let playersBindIndex = this.playersBinds
      .findIndex((playersBind: PlayersBind) => playersBind.room === room);

    this.playersBinds[playersBindIndex].players = this.playersBinds[playersBindIndex].players
      .filter((player) => player !== removePlayer);
  }

  public async sendPlayerBind(game: Game, room: Room): Promise<boolean> {
    const app = await this.tokenService.getByAppName(game.appName);
    const sendingPlayersBind = this.playersBinds.find((playersBind: PlayersBind) => playersBind.room === room.token);

    return axios.post<any>(`${game.requestUrl}/api/set-user-bind`, sendingPlayersBind, {
      headers: {
        Authorization: "Bearer " + app.token
      }
    }).then((response) => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    }).catch(() => false);
  }
}
