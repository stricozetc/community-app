import { IconButtonProps } from '@material-ui/core/IconButton';

export interface VkDialogProps extends IconButtonProps {
  open: boolean;
  onClose: () => void;
}
