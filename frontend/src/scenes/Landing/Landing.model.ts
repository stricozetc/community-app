import { History } from 'history';

import { AuthStatus } from 'models';

export interface LandingProps {
  status: AuthStatus;
  history: History;
}
