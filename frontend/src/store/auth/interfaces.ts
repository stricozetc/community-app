import { AuthStatus } from 'models';

export interface AuthState {
  status: AuthStatus;
  user: FrontEndUser | undefined;
}

export interface FrontEndUser {
  id: number;
  name: string;
  email: string;
  iat: number;}
