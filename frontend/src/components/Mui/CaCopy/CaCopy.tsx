import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CopyIcon from '@material-ui/icons/Description';
import { SnackbarType } from 'models';
import { createStyled } from 'utils';

import { CaCopyProps } from './CaCopy.model';
import { styles } from './CaCopy.styles';

const Styled = createStyled(styles);

export const CaCopy = ({ copyHandler, successHandler }: CaCopyProps) => {
  const handleClick = () => {
    copyHandler();
    successHandler({
      type: SnackbarType.Success,
      message: {
        msg: 'Application token was successful copied'
      }
    });
  };

  return(
    <Styled>{({ classes }) => (
      <Tooltip title='Copy' placement='right'>
        <IconButton aria-label='Copy' className={classes.copyIconButton} onClick={handleClick} >
          <CopyIcon className={classes.copyIcon} />
        </IconButton>
      </Tooltip>
    )}</Styled>
  );
};
