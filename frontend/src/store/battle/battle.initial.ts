import { BattleStatus } from 'models';

import { BattleState } from './interfaces';

type State = BattleState;

export const initialState: State = {
  status: BattleStatus.INIT,
  roomsInfo: [],
  roomURL: '',
  battleName: '',
  countdown: 0
};
