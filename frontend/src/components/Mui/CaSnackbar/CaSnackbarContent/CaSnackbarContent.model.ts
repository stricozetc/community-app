import { SnackbarContentProps } from '@material-ui/core/SnackbarContent';
import { SnackbarType } from 'models';

export interface CaSnackbarContentProps extends SnackbarContentProps {
  type: SnackbarType;
}
