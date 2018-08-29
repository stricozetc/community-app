import { IconButtonProps } from '@material-ui/core/IconButton';

export interface CaDialogInfoProps extends IconButtonProps {
  open: boolean;
  onClose: () => void;
  appToken: string;
  onSuccess: () => void;
}
