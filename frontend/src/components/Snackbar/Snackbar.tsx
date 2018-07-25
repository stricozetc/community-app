import { Snackbar, Slide } from '@material-ui/core';
import * as React from 'react';
import { CaSnackbarProps } from './Snackbar.model';
import { CaSnackbarContent } from './SnackbarContent';

export class CaSnackbar extends React.Component<CaSnackbarProps> {
  public render(): JSX.Element {

    const { type, handleClose, message, ...otherProps } = this.props;

    const transition = (props: any): JSX.Element => {

      return <Slide {...props} direction={this.props.transitionDirection} />;
    };

    return (
      <Snackbar
        anchorOrigin={this.props.anchorOrigin}
        open={this.props.open}
        onClose={handleClose && handleClose}
        autoHideDuration={this.props.autoHideDuration}
        action={this.props.action}

        TransitionComponent={transition}
        {...otherProps}
      >
        <CaSnackbarContent
          /* there is some discrepancy with types of message attribute:
          Snackbar message attribute has the following type: {message?: React.ReactElement<any>;}
          However, SnackbarContent message attribute type is as follows: {message: React.ReactElement<any> | string;}
          */
          message={this.props.message || ''}
          type={type}
        />
      </Snackbar>
    );
  }
}
