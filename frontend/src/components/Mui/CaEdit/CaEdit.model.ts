import { IconButtonProps } from '@material-ui/core/IconButton';

export interface CaEditProps extends IconButtonProps {
  editHandler: () => void;
}
