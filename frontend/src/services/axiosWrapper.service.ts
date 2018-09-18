import axios, { AxiosResponse } from 'axios';

import * as configFile from './../config.json';

export class HttpWrapper {
    private static baseUrl: string = configFile.url + '/';

    public static post<T, R>(url: string, data: T): Promise<AxiosResponse<R>> {
        return axios.post(`${this.baseUrl}${url}`, data);
    }
    
    public static get<R>(url: string): Promise<AxiosResponse<R>> {
        return axios.get(`${this.baseUrl}${url}`);
    }
}