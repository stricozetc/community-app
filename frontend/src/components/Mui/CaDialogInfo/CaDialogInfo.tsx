import * as React from 'react';
import * as CopyToClipboard from 'react-copy-to-clipboard';
import { I18n } from 'react-i18next';

import { IconButton } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import { SnackbarPayload } from 'models';
import { createStyled } from 'utils';

import { CaCopy } from '../CaCopy/CaCopy';

import { CaDialogInfoProps } from './CaDialogInfo.model';
import './CaDialogInfo.scss';
import { styles } from './CaDialogInfo.styles';

const Styled = createStyled(styles);

const handleFocus = (event: any) => {
  event.target.select();
};

export const CaDialogInfo = ({ open, onClose, appToken, onSuccess }: CaDialogInfoProps) => (
  <Styled>{({ classes }) => (
    <I18n>{t => (
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>{t('copyTokenHeader')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>{t('copyTokenMainText')}</span>
            <br /><br />
            <span>{t('copyTokenOfferMessage')}</span>
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
              <CaCopy copyHandler={(data: SnackbarPayload) => onSuccess(data)}/>
            </IconButton>
          </CopyToClipboard>
        </div>
      </Dialog>
    )}</I18n>
  )}</Styled>
);
