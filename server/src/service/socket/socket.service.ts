export abstract class SocketService {
    public abstract setSocket(serverInstance: any): void;

    public abstract notifyAllClients(eventName: string, payload: any): void;
}
