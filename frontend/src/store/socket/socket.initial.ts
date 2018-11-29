import { SocketStatus } from 'models';

import { SocketState } from './interfaces';

type State = SocketState;

export const initialState: State = {
  status: SocketStatus.Opened
};
