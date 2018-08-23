import axios from 'axios';

export class HttpWrapper {
    private static baseUrl: string = 'http://localhost:3030/';

    public static post<T>(url: string, data: T): Promise<any> {
        return axios.post(`${this.baseUrl}${url}`, data);
    }

    public static get(url: string): Promise<any> {
        return axios.get(`${this.baseUrl}${url}`);
    }
}
