import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import { createStyled } from 'utils';

import { CaEditProps } from './CaEdit.model';
import { styles } from './CaEdit.styles';

const Styled = createStyled(styles);

export const CaEdit = ({ editHandler }: CaEditProps) => (
  <Styled>{({ classes }) => (
    <Tooltip title='Edit' placement='top'>
      <IconButton aria-label='Delete' className={classes.editIconButton} onClick={editHandler} >
        <EditIcon className={classes.editIcon} />
      </IconButton>
    </Tooltip>
  )}</Styled>
);
