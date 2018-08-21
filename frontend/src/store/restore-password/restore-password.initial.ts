import { RestorePasswordStatus } from 'models';

import { RestorePasswordState } from './interfaces';

type State = RestorePasswordState;

export const initialState: State = {
  status: RestorePasswordStatus.Init,
  userEmail: '',
};
