import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';

import { I18n } from 'react-i18next';

import { CaDialogProps } from './CaDialog.model';
import { styles } from './CaDialog.styles';

export const CaDialog = withStyles(styles)((props: CaDialogProps) => {
  return (
    <I18n>
      {
        ( t ) => (
          <div>
            <Dialog
              open={props.open}
              onClose={props.onClose}
            >
              <DialogTitle id='alert-dialog-title'>{t('deleteHeader')}</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  <span>{t('deleteMainText')}</span>
                  <br/> <br/>
                  <span>{t('deleteApproveQuery')}</span>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={props.onClose} >
                  {t('disagree')}
                </Button>
                <Button onClick={props.onAccept}>
                  {t('agree')}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )
      }
    </I18n>
  );
});
