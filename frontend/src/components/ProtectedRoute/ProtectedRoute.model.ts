import {
  AuthStatus,
} from 'models';

import { RouteProps } from 'react-router';

export interface ProtectedRouteProps extends RouteProps {
  status: AuthStatus;
}
