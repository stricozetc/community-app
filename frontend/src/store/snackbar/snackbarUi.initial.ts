import { SnackbarType } from 'models';

import { SnackbarUiState } from './interfaces';

type State = SnackbarUiState;

export const initialState: State = {
  isOpen: false,
  type: SnackbarType.Error,
  message: [{
    msg: ''
  }]
};
