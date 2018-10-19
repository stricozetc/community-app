import { WError } from '../../../node_modules/@types/verror';

export abstract class ErrorService {
    public abstract getError(error: Error, message: string): WError;
}
