import { Container } from 'inversify';

import { QueueServiceImplementation, QueueService } from './queue';
import { SocketService, SocketServiceImplementation } from './socket';

export const CONTAINER = new Container();

CONTAINER.bind<QueueService>(QueueService).to(QueueServiceImplementation);
CONTAINER.bind<SocketService>(SocketService).to(SocketServiceImplementation);
