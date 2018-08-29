import 'reflect-metadata';

import { InversifyExpressServer } from 'inversify-express-utils';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import SocketIO from 'socket.io';
import passport from 'passport';
import cors from 'cors';

import {
    LoggerService,
    LoggerServiceImplementation,
    SocketService,
    SocketServiceImplementation
} from './service';

import './controller';
import { CONTAINER } from './service/services-registration';

import { db, RoleModel, Roles } from 'models';
import { passportConfig } from './config/passport';

const server = new InversifyExpressServer(CONTAINER);

import config from './config/app.config.json';

server.setConfig((app) => {
    process.env.NODE_ENV !== config.production ? app.use(morgan('dev')) : app.use(morgan('prod'));

    app.use(cors());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(passport.initialize());
    passportConfig(passport);
    app.use(bodyParser.json());
});

// makeAssosiations();

db.connect.sync({
    logging: console.log
})
    .then(() => {
        return RoleModel.upsert({
            name: Roles.User,
            createAt: Date.now(),
            updatedAt: Date.now()
        });
    })
    .then(() => {
        return RoleModel.upsert({
            name: Roles.Admin,
            createAt: Date.now(),
            updatedAt: Date.now()
        });
    })
    .catch((err) => {
        logger.errorLog(err);
    });

const logger: LoggerService = new LoggerServiceImplementation();
const application = server.build();

const serverInstance = application.listen(config.port, () => {
    logger.infoLog(`App is running at http://localhost:${config.port}`);
    logger.infoLog('Press CTRL+C to stop\n');
});

const socketService: SocketServiceImplementation = SocketServiceImplementation.getInstance();
socketService.setSocket(SocketIO(serverInstance));
