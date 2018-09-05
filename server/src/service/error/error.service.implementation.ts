import { WError } from 'verror';
import { injectable } from 'inversify';

import { ErrorService } from './error.service';

@injectable()
export class ErrorServiceImplementation extends ErrorService {
    public getError(error: Error, message: string): WError {
        return new WError(error, message);
    }
}
