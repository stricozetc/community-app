import { BattleStatus } from 'models';

import { BattleState } from './interfaces';

type State = BattleState;

export const initialState: State = {
  status: BattleStatus.Init,
  roomsInfo: [],
  roomURL: '',
  battleName: '',
  countdown: 0
};
