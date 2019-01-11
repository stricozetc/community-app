import axios from 'axios';

export const setAuthToken = (token: string) => {
    if (token) {
        // tslint:disable-next-line:no-string-literal
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        throw new Error('Token can not be empty');
    }
};

export const deleteAuthToken = () => {
    // tslint:disable-next-line:no-string-literal
    delete axios.defaults.headers.common['Authorization'];
};
