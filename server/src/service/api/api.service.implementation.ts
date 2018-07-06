import axios, { AxiosResponse } from 'axios';
import { decorate, injectable } from 'inversify';

import { ApiService, NewRoomResponse } from "./api.service";

decorate(injectable(), ApiService);

@injectable()
export class ApiServiceImplementation extends ApiService {
  public getRoomUrl(requestUrl: string): Promise<any> {
    return axios.get(requestUrl);
  }

  public startNewRoom(requestUrl: string, data: any): Promise<NewRoomResponse> {
    return axios.post<boolean>(requestUrl, data, {
      headers: {
        // tslint:disable-next-line
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjYsIm5hbWUiOiIxMjMiLCJpYXQiOjE1MzA5NTA4ODUsImV4cCI6MTUzMDk3MjQ4NX0.jAZFYuHqmE4nnk5xBkOadR_dJyX3oB5da0IwQ5u1xrs"
      }
    }).then((response: AxiosResponse) => {
      return response.data;
    });
  }
}
