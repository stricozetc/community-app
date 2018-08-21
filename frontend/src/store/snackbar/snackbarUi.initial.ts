import { SnackbarUiState } from './interfaces';
import { SnackbarType } from 'models';

type State = SnackbarUiState;

export const initialState: State = {
  isOpen: false,
  type: SnackbarType.ERROR,
  message: ''
};