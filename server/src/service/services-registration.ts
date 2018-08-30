import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { LoggerService, LoggerServiceImplementation } from './logger';
import { SocketServiceImplementation, SocketService } from './socket';

import { ErrorServiceImplementation, ErrorService } from './error';
import { RoomService } from './room';
import { TimerService } from './timer';
import { ApiService, ApiServiceImplementation } from './api';
import {
    UserAuthenticationRepository,
    UserAuthenticationRepositoryImplementation
} from './user-authentication';
import { GamesRepository, GamesRepositoryImplementation } from './games';
import { AppTokenRepository, AppTokenService } from './app-token';
import { PlayersBindService } from './players-bind';
import { StatisticService, StatisticRepositoryImplementation, StatisticRepository } from './statistic';
import { MyGamesRepository } from './my-games/my-games.repository';
import { MyGamesRepositoryImplementation } from './my-games/my-games.repository.implementation';
import { UserSettingsRepository, UserSettingsRepositoryImplementation } from './user-settings';
import { MailerService } from './mailer';

export const CONTAINER = new Container();

CONTAINER.bind<LoggerService>(LoggerService).to(LoggerServiceImplementation);

CONTAINER.bind<ErrorService>(ErrorService).to(ErrorServiceImplementation);
CONTAINER.bind<RoomService>(RoomService).to(RoomService);
CONTAINER.bind<TimerService>(TimerService).to(TimerService);
CONTAINER.bind<ApiService>(ApiService).to(ApiServiceImplementation);
CONTAINER.bind<UserAuthenticationRepository>(UserAuthenticationRepository).to(UserAuthenticationRepositoryImplementation);
CONTAINER.bind<GamesRepository>(GamesRepository).to(GamesRepositoryImplementation);
CONTAINER.bind<AppTokenService>(AppTokenService).to(AppTokenService);
CONTAINER.bind<AppTokenRepository>(AppTokenRepository).to(AppTokenRepository);
CONTAINER.bind<PlayersBindService>(PlayersBindService).to(PlayersBindService);
CONTAINER.bind<StatisticRepository>(StatisticRepository).to(StatisticRepositoryImplementation);
CONTAINER.bind<StatisticService>(StatisticService).to(StatisticService);
CONTAINER.bind<MyGamesRepository>(MyGamesRepository).to(MyGamesRepositoryImplementation);
CONTAINER.bind<UserSettingsRepository>(UserSettingsRepository).to(UserSettingsRepositoryImplementation);
CONTAINER.bind<MailerService>(MailerService).to(MailerService);

export const inject = getDecorators(CONTAINER).lazyInject;
