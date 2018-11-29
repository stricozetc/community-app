import * as React from 'react';
import * as CopyToClipboard from 'react-copy-to-clipboard';
import { I18n } from 'react-i18next';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';

import { createStyled } from 'utils';

import { CaCopy } from '../CaCopy/CaCopy';

import { CaDialogInfoProps } from './CaDialogInfo.model';
import './CaDialogInfo.scss';
import { styles } from './CaDialogInfo.styles';

const Styled = createStyled(styles);

const handleFocus = (event: React.FocusEvent<HTMLDivElement | HTMLInputElement>) => {
  (event.target as HTMLInputElement).select();
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
            <div>
            {/* Those div need to be added for prevent warning message in console.
            Without him copy to clipboard function doesn`t works.
            */}
              <CaCopy copyHandler={onSuccess}/>
            </div>
          </CopyToClipboard>
        </div>
      </Dialog>
    )}</I18n>
  )}</Styled>
);
