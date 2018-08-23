import { IconButtonProps } from '@material-ui/core/IconButton';

export interface CaDialogProps extends IconButtonProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}
