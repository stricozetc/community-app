import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LockIcon from '@material-ui/icons/Lock';
import { createStyled } from 'utils';

import { CaLockProps } from './CaLock.model';
import { styles } from './CaLock.styles';

const Styled = createStyled(styles);

export const CaLock = ({ showAppToken }: CaLockProps) => (
  <Styled>{({ classes }) => (
    <Tooltip title='Show Application Token' placement='left'>
      <IconButton className={classes.lockIconButton} onClick={showAppToken}>
        <LockIcon className={classes.lockIcon} />
      </IconButton>
    </Tooltip>
  )}</Styled>
);
