import axios, { AxiosResponse } from 'axios';

export class HttpWrapper {
    private static baseUrl: string = 'http://localhost:3030/';

    public static post<T, R>(url: string, data: T): Promise<AxiosResponse<R>> {
        return axios.post(`${this.baseUrl}${url}`, data);
    }
    
    public static get<R>(url: string): Promise<AxiosResponse<R>> {
        return axios.get(`${this.baseUrl}${url}`);
    }
}

/* public static post<T, R>(url: string, data: T): Promise<AxiosResponse<R>> {
    return axios.post(`${this.baseUrl}${url}`, data);
}

public static get<R>(url: string): Promise<AxiosResponse<R>> {
    return axios.get(`${this.baseUrl}${url}`);
}
} */