import { ErrorBlock, SnackbarType } from 'models';

export interface SnackbarUiState {
  isOpen: boolean;
  type: SnackbarType;
  message: ErrorBlock[];
}
