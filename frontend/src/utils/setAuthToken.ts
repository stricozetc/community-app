import axios from 'axios';

export const setAuthToken = (token: string) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        throw new Error('Token can not be empty');
    }
}

export const deleteAuthToken = () => {
    delete axios.defaults.headers.common['Authorization'];
}
