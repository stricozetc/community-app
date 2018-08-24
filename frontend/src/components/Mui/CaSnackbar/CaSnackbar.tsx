import * as React from 'react';

import { Slide, Snackbar } from '@material-ui/core';
import { SnackbarType } from 'models';
import { createStyled } from 'utils';

import { CaSnackbarProps } from './CaSnackbar.model';
import { styles } from './CaSnackbar.styles';
import { CaSnackbarContent } from './CaSnackbarContent';

const Styled = createStyled(styles);

const transition = (props: CaSnackbarProps): JSX.Element => {
  return <Slide {...props} direction={props.transitionDirection} />;
};

export const CaSnackbar = ({ type, handleClose, message, transitionDirection, ...otherProps }: CaSnackbarProps) => (
  <Styled>{({ classes }) => (
    <Snackbar
      className={type === SnackbarType.Info ? classes.positionBottom : classes.positionTop}
      onClose={handleClose && handleClose}

      TransitionComponent={transition}
      {...otherProps}
    >
      <CaSnackbarContent
        /* there is some discrepancy with types of message attribute:
        Snackbar message attribute has the following type: {message?: React.ReactElement<any>;}
        However, SnackbarContent message attribute type is as follows: {message: React.ReactElement<any> | string;}
        */
        message={message || ''}
        type={type}
      />
    </Snackbar>
  )}</Styled>
);
