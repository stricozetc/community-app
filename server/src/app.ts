import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from "morgan";

import './controller';

import { CONTAINER } from './service/services-registration';

import {
    SocketService,
    SocketServiceImplementation,
    QueueServiceImplementation
} from './service';

const server = new InversifyExpressServer(CONTAINER);
const socket: SocketService = new SocketServiceImplementation(new QueueServiceImplementation());

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(express.static('../build'));
});

const application = server.build();
const serverInstance = application.listen(3030, () => {
    console.log(`App is running at http://localhost:3030`);
    console.log('Press CTRL+C to stop\n');
});

socket.connection(serverInstance);
