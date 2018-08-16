import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';

import { CaDialogProps } from './CaPopover.model';
import { styles } from './CaPopover.styles';

export const CaPopover = withStyles(styles)((props: CaDialogProps) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
      >
        <DialogTitle id='alert-dialog-title'>{`Are YOU sure want to delete this game?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <span> Keep in mind that you will not be able to restore game and all information about it. </span>
            <br/> <br/>
            <span> If you still want to this delete game, click "Agree". </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} >
            Disagree
          </Button>
          <Button onClick={props.onAccept}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
