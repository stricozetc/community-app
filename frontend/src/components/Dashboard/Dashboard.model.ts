import { AuthStatus } from "models";

export interface DashboardProps {
  status: AuthStatus,
  history: any,
  logoutUser(): void
}
