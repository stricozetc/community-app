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
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksIm5hbWUiOiJ0MSIsImlhdCI6MTUzMTEzOTk2MywiZXhwIjoxNTMxMTYxNTYzfQ.7K9jcmkfVWG_Ws7fWEYy6jz76gbB_1GTg_1IEwbU7A4"
      }
    }).then((response: AxiosResponse) => {
      return response.data;
    });
  }
}
