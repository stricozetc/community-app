import { Container } from 'inversify';

import { QueueServiceImplementation, QueueService } from './queue';

export const CONTAINER = new Container();

CONTAINER.bind<QueueService>(QueueService).to(QueueServiceImplementation);
