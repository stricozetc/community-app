import { withStyles, IconButton } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import * as React from 'react';
import * as CopyToClipboard from 'react-copy-to-clipboard';

import { CaCopy } from '../CaCopy/CaCopy';

import { CaDialogInfoProps } from './CaDialogInfo.model';
import './CaDialogInfo.scss';
import { styles } from './CaDialogInfo.styles';
// import IconButton from '@material-ui/core/IconButton';

export const CaDialogInfo = withStyles(styles)((props: CaDialogInfoProps) => {

  const { classes, open, onClose, appToken } = props;

  const handleFocus = (event: any) => {
    event.target.select();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>Application Token</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span> Keep in mind that it's secret information, don't share it with other people</span>
            <br/><br/>
            <span> If you want to copy application token of this game, click on icon.</span>
          </DialogContentText>
        </DialogContent>
        <div className='input-container'>
          <Input
            value={appToken}
            className={classes.input}
            onFocus={handleFocus}
            autoFocus={true}
            classes={{
              underline: classes.underline
            }}
          />
          <CopyToClipboard text={appToken}>
            <IconButton>
              <CaCopy copyHandler={onClose}/>
            </IconButton>
          </CopyToClipboard>
        </div>
      </Dialog>
    </div>
  );
});
