import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from "morgan";
import * as SocketIO from 'socket.io';

import { QuestInfo } from '@community-app/quest-info';

import './controller';
import { CONTAINER } from './service/services-registration';
import { QueueService, QueueServiceImplementation } from './service';

const server = new InversifyExpressServer(CONTAINER);

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

const queueService: QueueService = new QueueServiceImplementation();
// tslint:disable-next-line:no-var-requires
const questsConfig: QuestInfo[] = require('./config/quests.json').quests;
const socketIO = SocketIO(serverInstance);

socketIO.on('connection', (client: SocketIO.Socket) => {
    console.log('Player connection opened');

    client.on('disconnect', () => {
        console.log('Player connection closed');        
        queueService.deletePlayer(client);
    });

    for (let index = 0; index < questsConfig.length; index++) {
        client.on(questsConfig[index].eventName,
            () => queueService.setNewPlayer(questsConfig[index].id, client));
    }
});
