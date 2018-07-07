import { injectable } from "inversify";

import {
    createLogger,
    Logger,
    format,
    transports
} from 'winston';

import { LoggerService } from "./logger.service";

@injectable()
export class LoggerServiceImplementation implements LoggerService {
    private loggerConfig: any = require('../../config/logger.config.json');
    private appConfig: any = require('../../config/app.config.json');

    private logger: Logger = createLogger({
        level: this.loggerConfig.level,
        format: format.json(),
        transports: [
            new transports.File({ filename: this.loggerConfig.errorLogName, level: this.loggerConfig.errorLevel }),
            new transports.File({ filename: this.loggerConfig.combinedLogName })
        ]
    });

    constructor() {
        if (process.env.NODE_ENV !== this.appConfig.production) {
            this.logger.add(new transports.Console({
                format: format.simple()
            }));
        }
    }

    public infoLog(message: string): void {
        this.logger.info(message);
    }

    public errorLog(message: string): void {
        this.logger.error(message);
    }
}
