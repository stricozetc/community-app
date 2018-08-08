import { createStyles } from '@material-ui/core';

import {
  defaultDeleteIconBgColorHover,
  defaultDeleteIconColor,
  defaultDeleteIconColorHover
} from 'style/muiTheme.colors';

export const styles = () => createStyles({
  deleteIconButton: {
    color: defaultDeleteIconColor,

    '&:hover': {
      color: defaultDeleteIconColorHover,
      backgroundColor: defaultDeleteIconBgColorHover
    }
  },
  deleteIcon: {
    fontSize: '30px'
  }
});
