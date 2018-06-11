import { AuthState } from './interfaces';

type State = AuthState;

export const initialState: State = {
    isAuthenticated: false,
    user: undefined
};