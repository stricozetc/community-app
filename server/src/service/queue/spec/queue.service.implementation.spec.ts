import 'reflect-metadata';

import { QueueServiceImplementation } from "../queue.service.implementation";
import { LoggerServiceImplementation } from '../..';

describe('QueueServiceImplementation', () => {
    let service: QueueServiceImplementation;

    const client: SocketIO.Socket = {
        emit: (event: string | symbol, ...args: any[]): boolean => {
            return;
        }
    } as SocketIO.Socket;

    beforeEach(() => {
        service = new QueueServiceImplementation(new LoggerServiceImplementation());
    });

    it('should set new player', async () => {
        service.setNewPlayer(0, client);
    });
});
