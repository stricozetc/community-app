import { SnackbarProps } from "@material-ui/core/Snackbar";


export interface CaSnackbarProps extends SnackbarProps{
 type: string;
 handleClose?: () => void;
}
