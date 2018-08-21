import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';

import { CaEditProps } from './CaEdit.model';
import { styles } from './CaEdit.styles';

export const CaEdit = withStyles(styles)((props: CaEditProps) => {
  const { classes, editHandler } = props;

  return (
      <Tooltip title='Edit' placement='top'>
        <IconButton aria-label='Delete' className={classes.editIconButton} onClick={editHandler} >
          <EditIcon  className={classes.editIcon} />
        </IconButton>
      </Tooltip>
  );
});
