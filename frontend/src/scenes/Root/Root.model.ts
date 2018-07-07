import { AuthStatus } from 'models';

export interface RootProps {
  status: AuthStatus;
  history: any;

  logoutUser(): void;
}
