import { AuthStatus, /* Roles */ } from 'models';

export interface AuthState {
  status: AuthStatus;
  user: FrontEndUser | undefined;
  appMenuLinks: string[];
  spinnerRun: boolean;
}

export interface FrontEndUser {
  id: number;
  name: string;
  email: string;
  token: string;
  language: string;
  imageUrl?: string;
  roleId: number;
}
