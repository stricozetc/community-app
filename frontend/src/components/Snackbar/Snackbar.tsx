import './Snackbar.scss';

import * as React from 'react';
import { CaSnackbarProps } from './Snackbar.model';

import Snackbar from '@material-ui/core/Snackbar';

export const CaSnackbar = (props: CaSnackbarProps) => {

  const { type, handleClose } = props;
  const classes: String[] = [];

  switch (type) {
    case 'error':
      classes.push('ca-snackbar--red');
      break;

    case 'info':
      classes.push('ca-snackbar--info');
      break;

    case 'warning':
      classes.push('ca-snackbar--warning');
      break;

    case 'success':
      classes.push('ca-snackbar--success');
      break;

    default:
      break;
  }
  
  return (
    <Snackbar
      className={["ca-snackbar", ...classes].join(' ')}
      // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      anchorOrigin={props.anchorOrigin}
      open={props.open}
      onClose={handleClose && handleClose}
      TransitionComponent={props.TransitionComponent}
      autoHideDuration={props.autoHideDuration}
      message={props.message}
      action={props.action}
    />
  );
};
