import { WithStyles } from '@material-ui/core';
import { SnackbarProps } from '@material-ui/core/Snackbar';
import { SnackbarType, transitionDirection } from 'models';
import { Omit } from 'utils/Omit';

import { styles } from './CaSnackbar.styles';

export interface CaSnackbarProps extends WithStyles<typeof styles>, Omit<SnackbarProps, 'classes'> {
  type: SnackbarType;
  transitionDirection: transitionDirection;
  handleClose?: () => void;
}
