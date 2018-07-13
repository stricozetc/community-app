import { AuthStatus } from 'models';

export interface AuthState {
  status: AuthStatus;
  user: FrontEndUser | undefined;
}

export interface FrontEndUser {
  id: string;
  name: string;
  email: string;
  iat: number;
}
