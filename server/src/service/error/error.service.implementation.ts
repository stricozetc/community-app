import { VError } from 'verror';

import { ErrorService } from "./error.service";
import { injectable } from 'inversify';

@injectable()
export class ErrorServiceImplementation extends ErrorService {
    public getError(error: Error, message: string): any {
        return new VError(error, message);
    }
}
