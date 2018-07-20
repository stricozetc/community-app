import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { LoggerService, LoggerServiceImplementation } from './logger';
import { SocketServiceImplementation, SocketService } from './socket';
import { QueueServiceImplementation, QueueService } from './queue';
import { ErrorServiceImplementation, ErrorService } from './error';
import { RoomService } from './room';
import { TimerService } from './timer';
import { ApiService, ApiServiceImplementation } from './api';
import {
    UserAuthenticationRepository,
    UserAuthenticationRepositoryImplementation
} from './user-authentication';
import { MocksRepository, MocksRepositoryImplementation } from './mocks';
import { AppTokenRepository, AppTokenService } from './app-token';
import { StatisticService, StatisticRepositoryImplementation, StatisticRepository } from './statistic';


export const CONTAINER = new Container();

CONTAINER.bind<LoggerService>(LoggerService).to(LoggerServiceImplementation);
CONTAINER.bind<SocketService>(SocketService).to(SocketServiceImplementation);
CONTAINER.bind<QueueService>(QueueService).to(QueueServiceImplementation);
CONTAINER.bind<ErrorService>(ErrorService).to(ErrorServiceImplementation);
CONTAINER.bind<RoomService>(RoomService).to(RoomService);
CONTAINER.bind<TimerService>(TimerService).to(TimerService);
CONTAINER.bind<ApiService>(ApiService).to(ApiServiceImplementation);
CONTAINER.bind<UserAuthenticationRepository>(UserAuthenticationRepository).to(UserAuthenticationRepositoryImplementation);
CONTAINER.bind<MocksRepository>(MocksRepository).to(MocksRepositoryImplementation);
CONTAINER.bind<AppTokenService>(AppTokenService).to(AppTokenService);
CONTAINER.bind<AppTokenRepository>(AppTokenRepository).to(AppTokenRepository);
CONTAINER.bind<StatisticRepository>(StatisticRepository).to(StatisticRepositoryImplementation);
CONTAINER.bind<StatisticService>(StatisticService).to(StatisticService);

export const inject = getDecorators(CONTAINER).lazyInject;
