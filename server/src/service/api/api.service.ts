export abstract class ApiService {
    public abstract getRoomUrl(requestUrl: string): Promise<string>;
}
