export abstract class SocketService {
    public abstract setSocket(serverInstance: SocketIO.Server): void;

    public abstract notifyAllClients(eventName: string, payload: string): void;
}
