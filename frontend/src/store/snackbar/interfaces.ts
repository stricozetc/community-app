import { SnackbarType } from 'models'

export interface SnackbarUiState {
  isOpen: boolean;
  type: SnackbarType;
  message: string
}
