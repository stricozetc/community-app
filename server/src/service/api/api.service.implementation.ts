import axios, { AxiosResponse } from 'axios';
import { decorate, inject, injectable } from 'inversify';

import { ApiService } from './api.service';
import { AppTokenService } from '../app-token';
import { Game } from 'models/games';

decorate(injectable(), ApiService);

@injectable()
export class ApiServiceImplementation extends ApiService {

    public constructor(@inject(AppTokenService) private tokenService: AppTokenService) {
        super();
    }

    public getRoomUrl(requestUrl: string): Promise<any> {
        return axios.get(requestUrl);
    }

    public async startNewRoom(requestUrl: string, data: any, game: Game): Promise<string> {
        const app = await this.tokenService.getByAppName(game.appName);

        if (app) {
            return axios.post<boolean>(requestUrl, data, {
                headers: {
                    Authorization: 'Bearer ' + app.appToken
                }
            }).then((response: AxiosResponse) => {
                return response.data;
            });
        } else {
            return Promise.reject('App is not defined!');
        }
    }

}
