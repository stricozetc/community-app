import { AuthStatus } from 'models';

import { AuthState } from './interfaces';

type State = AuthState;

export const initialState: State = {
  status: AuthStatus.NOT_AUTHORIZED,
  user: undefined
};
