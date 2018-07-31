import { WithStyles } from '@material-ui/core';
import { SnackbarContentProps } from '@material-ui/core/SnackbarContent';
import { SnackbarType } from 'models';
import { Omit } from 'utils/Omit';

import { styles } from './CaSnackbarContent.styles';

export interface CaSnackbarContentProps extends WithStyles<typeof styles>, Omit<SnackbarContentProps, 'classes'> {
  type: SnackbarType;
}
