export interface NewRoomResponse {
    status: string;
    token: string;
}

export abstract class ApiService {
    public abstract getRoomUrl(requestUrl: string): Promise<string>;

    public abstract startNewRoom(requestUrl: string, data: any): Promise<NewRoomResponse>;
}
