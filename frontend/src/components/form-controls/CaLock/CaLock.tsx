import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LockIcon from '@material-ui/icons/Lock';
import * as React from 'react';

import { CaLockProps } from './CaLock.model';
import { styles } from './CaLock.styles';

export const CaLock = withStyles(styles)((props: CaLockProps) => {
  const { classes, showAppToken } = props;

  return (
      <Tooltip title='Show Application Token' placement='left'>
        <IconButton className={classes.lockIconButton} onClick={showAppToken}>
          <LockIcon  className={classes.lockIcon} />
        </IconButton>
      </Tooltip>
  );
});
