import './Snackbar.scss';

import * as React from 'react';
import {CaSnackbarProps} from './Snackbar.model';

import {Snackbar} from '@material-ui/core';

import {CaSlide} from 'components/Slide';

export class CaSnackbar extends React.Component<CaSnackbarProps> {

  public render(): JSX.Element {
    const {type, handleClose} = this.props;
    const classes: string[] = [];

    const transition = (props: any): JSX.Element => {
      return <CaSlide {...props} direction={this.props.transitionDirection}/>;
    };

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
        className={['ca-snackbar', ...classes].join(' ')}
        anchorOrigin={this.props.anchorOrigin}
        open={this.props.open}
        onClose={handleClose && handleClose}
        autoHideDuration={this.props.autoHideDuration}
        message={this.props.message}
        action={this.props.action}
        TransitionComponent={transition}
      />
    );
  }
}
