
import axios from 'axios';
import { UserFieldsToLogin, UserFieldsToRegister } from 'interfaces/FrontEndValidation';



export class AxiosWrapper {
   

    public static registerUser(userData: UserFieldsToRegister): Promise<any>{
        return axios.post('api/users/register', userData)
    }

    public static loginUser(userData: UserFieldsToLogin): Promise<any>{
        return axios.post('api/users/login', userData)
    }
}