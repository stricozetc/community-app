import 'reflect-metadata';

import { InversifyExpressServer } from 'inversify-express-utils';

import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as SocketIO from 'socket.io';
import * as passport from 'passport';
import * as cors from 'cors';

import {
    LoggerService,
    LoggerServiceImplementation,
    SocketService,
    SocketServiceImplementation
} from './service';

import './controller';
import { CONTAINER } from './service/services-registration';

import { db } from './../models/SequelizeConnect';
import { RoleModel, Roles } from './../models/role';
import { passportConfig } from './config/passport';

const server = new InversifyExpressServer(CONTAINER);

// tslint:disable-next-line:no-var-requires
const config = require('./config/app.config.json');

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
            name: Roles.admin,
            createAt: Date.now(),
            updatedAt: Date.now()
        });
    })
    .then(() => {
        return RoleModel.upsert({
            name: Roles.user,
            createAt: Date.now(),
            updatedAt: Date.now()
        });
    })
    .catch((err) => {
        console.dir(err);
    });

const logger: LoggerService = new LoggerServiceImplementation();
const application = server.build();

const serverInstance = application.listen(config.port, () => {
    logger.infoLog(`App is running at http://localhost:${config.port}`);
    logger.infoLog('Press CTRL+C to stop\n');
});

const socketService: SocketService = new SocketServiceImplementation();
socketService.setSocket(SocketIO(serverInstance));
