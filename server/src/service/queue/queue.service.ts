export abstract class QueueService {
    public abstract setNewPlayer(id: number, player: SocketIO.Socket): void;
    public abstract deletePlayer(player: SocketIO.Socket): void;
}
