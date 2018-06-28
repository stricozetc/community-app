import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { LoggerService, LoggerServiceImplementation } from './logger';
import { SocketServiceImplementation, SocketService } from './socket';
import { QueueServiceImplementation, QueueService } from './queue';
import { ErrorServiceImplementation, ErrorService } from './error';
import { ApiService, ApiServiceImplementation } from './api';
import {
    UserAuthenticationRepository,
    UserAuthenticationRepositoryImplementation
} from './user-authentication';
import { MocksRepository, MocksRepositoryImplementation } from './mocks';



export const CONTAINER = new Container();

CONTAINER.bind<LoggerService>(LoggerService).to(LoggerServiceImplementation);
CONTAINER.bind<SocketService>(SocketService).to(SocketServiceImplementation);
CONTAINER.bind<QueueService>(QueueService).to(QueueServiceImplementation);
CONTAINER.bind<ErrorService>(ErrorService).to(ErrorServiceImplementation);
CONTAINER.bind<ApiService>(ApiService).to(ApiServiceImplementation);
CONTAINER.bind<UserAuthenticationRepository>(UserAuthenticationRepository).to(UserAuthenticationRepositoryImplementation);
CONTAINER.bind<MocksRepository>(MocksRepository).to(MocksRepositoryImplementation);

export const inject = getDecorators(CONTAINER).lazyInject;
