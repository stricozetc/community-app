import axios from 'axios';

export class HttpWrapper {

    public static post(url: string, data: any): Promise<any> {
        return axios.post(url, data)
    }

    public static get(url: string): Promise<any> {
        return axios.get(url)
    }
}
