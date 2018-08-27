import { IconButtonProps } from '@material-ui/core/IconButton';
import { SnackbarPayload } from 'models';

export interface CaDialogInfoProps extends IconButtonProps {
  open: boolean;
  onClose: () => void;
  appToken: string;
  onSuccess: (data: SnackbarPayload) => void;
}
