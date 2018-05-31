export abstract class ErrorService {
    public abstract getError(error: Error, message: string): any;
}
