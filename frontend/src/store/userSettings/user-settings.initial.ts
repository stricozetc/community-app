import { UserSettingsState } from './interfaces';
import { LoadStatus } from 'models';

type State = UserSettingsState;

export const initialState: State = {
  changePasswordStatus: LoadStatus.Init,
  changePasswordErrors: undefined
};
