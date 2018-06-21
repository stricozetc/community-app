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
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjYsIm5hbWUiOiIxMjMiLCJpYXQiOjE1MzA3OTI5NTIsImV4cCI6MTUzMDgxNDU1Mn0.mQgBPrDPG2bQmb9ouAhQ5u_80kdEg7wQirnvOKHOfWY"
            }
        }).then((response: AxiosResponse) => {
            return response.data;
        });
    }
}
