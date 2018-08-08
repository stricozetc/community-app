import { createStyles } from '@material-ui/core';

import {
  defaultEditIconBgColorHover,
  defaultEditIconColor,
  defaultEditIconColorHover
} from 'style/muiTheme.colors';

export const styles = () => createStyles({
  editIconButton: {
    color: defaultEditIconColor,

    '&:hover': {
      color: defaultEditIconColorHover,
      backgroundColor: defaultEditIconBgColorHover
    }
  },
  editIcon: {
    fontSize: '30px'
  }
});
