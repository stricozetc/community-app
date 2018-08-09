import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';

import { CaDialogProps } from './CaDialog.model';
import { styles } from './CaDialog.styles';

export const CaDialog = withStyles(styles)((props: CaDialogProps) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{`Are yoy sure want to delete this game?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {/* Delete {this.props.nameOfTheGame} */}
            Delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Disagree
          </Button>
          <Button onClick={props.onAccept} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
