import axios from 'axios';
import { injectable, decorate } from 'inversify';

import { ApiService } from "./api.service";
decorate(injectable(), ApiService);
@injectable()
export class ApiServiceImplementation extends ApiService {
    public getRoomUrl(requestUrl: string): Promise<any> {
        return axios.get(requestUrl);
    }
}
