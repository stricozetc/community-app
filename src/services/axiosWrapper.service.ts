
import axios from 'axios';
// import { UserFieldsToLogin, UserFieldsToRegister } from 'interfaces/FrontEndValidation';



export class HttpWrapper {
   
    public static post(url: string, data: any): Promise<any>{
        return axios.post(url, data)
    }

    // public static registerUser(userData: UserFieldsToRegister): Promise<any>{
    //     return axios.post('api/users/register', userData)
    // }

    // public static loginUser(userData: UserFieldsToLogin): Promise<any>{
    //     return axios.post('api/users/login', userData)
    // }
}