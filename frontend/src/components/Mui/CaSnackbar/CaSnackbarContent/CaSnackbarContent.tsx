import * as React from 'react';
import { createStyled } from 'utils';

import { SnackbarContent } from '@material-ui/core';

import { CaSnackbarContentProps } from './CaSnackbarContent.model';
import { styles } from './CaSnackbarContent.styles';

const Styled = createStyled(styles);

export const CaSnackbarContent = ({ message, type }: CaSnackbarContentProps) => (
  <Styled>{({ classes }) => (
    <SnackbarContent
      className={classes[type]}
      message={message}
    />
  )}</Styled>
);
