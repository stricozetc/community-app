import { AuthState } from './../../store/auth/interfaces';

export interface DashboardProps {
  auth: AuthState,
  history: any,
  logoutUser(): void
}