import { SnackbarProps } from "@material-ui/core/Snackbar";


export interface CaSnackbarProps extends SnackbarProps{
 type: string;
 transitionDirection: 'left' | 'right' | 'up' | 'down';
 handleClose?: () => void;
}
