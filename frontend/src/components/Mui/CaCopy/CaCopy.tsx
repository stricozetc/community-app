import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CopyIcon from '@material-ui/icons/Description';

import { createStyled } from 'utils';

import { CaCopyProps } from './CaCopy.model';
import { styles } from './CaCopy.styles';

const Styled = createStyled(styles);
export const  CaCopy = ({copyHandler}: CaCopyProps) => {
  return (
    <Styled>{({ classes }) => (
      <Tooltip title='Copy' placement='right'>
        <IconButton aria-label='Copy' className={classes.copyIconButton} onClick={copyHandler} >
          <CopyIcon className={classes.copyIcon} />
        </IconButton>
      </Tooltip>
    )}</Styled>
  );
};
