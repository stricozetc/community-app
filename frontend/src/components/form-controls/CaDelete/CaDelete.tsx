import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';

import { CaDeleteProps } from './CaDelete.model';
import { styles } from './CaDelete.styles';

export const CaDelete = withStyles(styles)((props: CaDeleteProps) => {
  const { classes, deleteHandler } = props;

  return (
      <Tooltip title='Delete' placement='right'>
        <IconButton aria-label='Delete' className={classes.deleteIconButton} onClick={deleteHandler} >
          <DeleteIcon  className={classes.deleteIcon} />
        </IconButton>
      </Tooltip>
  );
});
