import { injectable, decorate } from "inversify";

import {
    createLogger,
    Logger,
    format,
    transports
} from 'winston';

import { LoggerService } from "./logger.service";

@injectable()
export class LoggerServiceImplementation implements LoggerService {
    private config: any = require('../../config/logger.config.json');
    private logger: Logger = createLogger({
        level: this.config.level,
        format: format.json(),
        transports: [
            new transports.File({ filename: this.config.errorLogName, level: 'error' }),
            new transports.File({ filename: this.config.combinedLogName })
        ]
    });

    constructor() {
        if (process.env.NODE_ENV !== 'production') {
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
