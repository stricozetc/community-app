import { SnackbarProps } from "@material-ui/core/Snackbar";


export interface CaSnackbarProps extends SnackbarProps{
 info: info;
 handleClose?: () => void;
}
export interface info {
  type: string,
  message: string
}
