import { SnackbarType } from './../../models';
import { WithStyles } from '@material-ui/core';
import { SnackbarProps } from '@material-ui/core/Snackbar';
import { Omit } from 'utils/Omit';
import { styles } from './Snackbar.styles';

export interface CaSnackbarProps extends WithStyles<typeof styles>, Omit<SnackbarProps, 'classes'> {
  type: SnackbarType;
  transitionDirection: 'left' | 'right' | 'up' | 'down';
  handleClose?: () => void;
}
