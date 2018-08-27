import { IconButtonProps } from '@material-ui/core/IconButton';

export interface CaCopyProps extends IconButtonProps {
  copyHandler: () => void;
}
