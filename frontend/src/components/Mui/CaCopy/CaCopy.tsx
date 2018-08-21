import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CopyIcon from '@material-ui/icons/Description';
import * as React from 'react';

import { CaCopyProps } from './CaCopy.model';
import { styles } from './CaCopy.styles';

export const CaCopy = withStyles(styles)((props: CaCopyProps) => {
  const { classes, copyHandler } = props;

  return (
    <Tooltip title='Copy' placement='right'>
      <IconButton aria-label='Copy' className={classes.copyIconButton} onClick={copyHandler} >
        <CopyIcon  className={classes.copyIcon} />
      </IconButton>
    </Tooltip>
  );
});
