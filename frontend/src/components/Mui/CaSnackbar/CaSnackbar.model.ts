import { SnackbarProps } from '@material-ui/core/Snackbar';
import { SnackbarType, transitionDirection } from 'models';

export interface CaSnackbarProps extends SnackbarProps {
  type: SnackbarType;
  transitionDirection: transitionDirection;
  handleClose?: () => void;
}

export interface SnackbarErrorMessage {
  code?: number;
  msg: string;
}
