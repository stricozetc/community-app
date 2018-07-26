import { WithStyles } from '@material-ui/core';
import { SnackbarContentProps } from '@material-ui/core/SnackbarContent';
import { Omit } from 'utils/Omit';
import { styles } from './SnackbarContent.styles';
import { SnackbarType } from 'models';

export interface CaSnackbarContentProps extends WithStyles<typeof styles>, Omit<SnackbarContentProps, 'classes'> {
  type: SnackbarType;
}
