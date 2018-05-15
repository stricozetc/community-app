import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from "morgan";

import './controller';
import { CONTAINER } from './service/services-registration';

let server = new InversifyExpressServer(CONTAINER);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(express.static('../build'));
});

let serverInstance = server.build();

serverInstance.listen(3030, () => {
    console.log(`App is running at http://localhost:3030`);
    console.log('Press CTRL+C to stop\n');
});
