import { IconButtonProps } from '@material-ui/core/IconButton';

export interface CaDeleteProps extends IconButtonProps {
  deleteHandler: () => void;
}
