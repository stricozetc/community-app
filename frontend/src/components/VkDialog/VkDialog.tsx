import * as React from 'react';
import { I18n } from 'react-i18next';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { VkDialogProps } from './VkDialog.model';
import { createStyled } from 'utils';


import { styles } from './VkDialog.styles';

const Styled = createStyled(styles);

export const VkDialog = ({ open, onClose, children }: VkDialogProps) => (
  <Styled>{({ classes }) => (
    <I18n>{t => (
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogContent className={classes.content}>
            {children}
        </DialogContent>
      </Dialog>
    )}</I18n>
  )}</Styled>
);
