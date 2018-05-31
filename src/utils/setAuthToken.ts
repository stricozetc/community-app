import axios from 'axios';

export const setAuthtoken = (token: string) => {
    if(token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        throw new Error('Token can not be empty');
    }
}

export const deleteAuthToken = () => {
   
    delete axios.defaults.headers.common['Authorization'];
    
}
