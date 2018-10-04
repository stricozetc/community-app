import { AuthStatus } from 'models';

import { AuthState } from './interfaces';

type State = AuthState;

export const initialState: State = {
  status: AuthStatus.NotAuthorized,
  user: undefined,
  spinnerRun: false
};
