import {SnackbarProps} from '@material-ui/core/Snackbar';

interface Info {
  type: string,
  message: string
}

export interface CaSnackbarProps extends SnackbarProps{
  info: Info,
  handleClose(): void
}


