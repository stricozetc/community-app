import { IconButtonProps } from '@material-ui/core/IconButton';
import { SnackbarPayload } from 'models';

export interface CaCopyProps extends IconButtonProps {
  copyHandler: () => void;
  successHandler: (data: SnackbarPayload) => void;
}
