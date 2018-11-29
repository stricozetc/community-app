import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyled } from 'utils';

import { CaDeleteProps } from './CaDelete.model';
import { styles } from './CaDelete.styles';

const Styled = createStyled(styles);

export const CaDelete = ({ deleteHandler }: CaDeleteProps) => (
  <Styled>{({ classes }) => (
    <Tooltip title='Delete' placement='right'>
      <IconButton aria-label='Delete' className={classes.deleteIconButton} onClick={deleteHandler} >
        <DeleteIcon className={classes.deleteIcon} />
      </IconButton>
    </Tooltip>
  )}</Styled>
);
