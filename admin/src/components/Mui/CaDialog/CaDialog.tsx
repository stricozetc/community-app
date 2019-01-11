import * as React from 'react';
import { I18n } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { CaDialogProps } from './CaDialog.model';

export const CaDialog = ({ open, onClose, onAccept }: CaDialogProps) => (
  <I18n>{t => (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle id='alert-dialog-title'>{t('deleteHeader')}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <span>{t('deleteMainText')}</span>
          <br /> <br />
          <span>{t('deleteApproveQuery')}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} >
          {t('disagree')}
        </Button>
        <Button onClick={onAccept}>
          {t('agree')}
        </Button>
      </DialogActions>
    </Dialog>
  )}</I18n>
);
