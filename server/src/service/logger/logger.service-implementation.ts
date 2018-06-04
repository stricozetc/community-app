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
    public log(message: string): void {
        const logger: Logger = createLogger({
            level: 'info',
            format: format.json(),
            transports: [
                new transports.File({ filename: 'error.log', level: 'error' }),
                new transports.File({ filename: 'combined.log' })
            ]
        });

        if (process.env.NODE_ENV !== 'production') {
            logger.add(new transports.Console({
                format: format.simple()
            }));
        }

        logger.info(message);
    }
}
