import { Container } from 'inversify';

import { QueueServiceImplementation, QueueService } from './queue';
import { SocketService, SocketServiceImplementation } from './socket';
import { 
    UserAuthenticationRepository,
    UserAuthenticationRepositoryImplementation     
} from './user-authentication';



export const CONTAINER = new Container();

CONTAINER.bind<QueueService>(QueueService).to(QueueServiceImplementation);
CONTAINER.bind<SocketService>(SocketService).to(SocketServiceImplementation);
CONTAINER.bind<UserAuthenticationRepository>(UserAuthenticationRepository).to(UserAuthenticationRepositoryImplementation);
