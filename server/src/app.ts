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

import { passportConfig } from './config/passport';

import * as passport from 'passport';

import { db } from './../models/SequalizeConnect';
import { Role } from './../models/role';



const server = new InversifyExpressServer(CONTAINER);
const socket: SocketService = new SocketServiceImplementation(new QueueServiceImplementation());


server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(passport.initialize());
    passportConfig(passport);
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(express.static('../build'));
});

const application = server.build();


// makeAssosiations();

db.connect.sync({
    logging: console.log
}).then(() => {
    Role.upsert({
        id: 1,
        name: 'admin',
        createAt: Date.now(),
        updatedAt: Date.now()
    }).then(() => {
        Role.upsert({
            id: 2,
            name: 'user',
            createAt: Date.now(),
            updatedAt: Date.now()
    });
    });
});



const serverInstance = application.listen(3030, () => {
    console.log(`App is running at http://localhost:3030`);
    console.log('Press CTRL+C to stop\n');
});

socket.connection(serverInstance);
