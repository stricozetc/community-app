import { createStyles } from '@material-ui/core';
import {
  defaultTableBgColor,
  defaultTableTextColor,
  hoverTableRowBgColor,
  hoverTableRowTextColor
} from 'style/muiTheme.colors';

export const MuiTable = createStyles({
  root: {
    backgroundColor: defaultTableBgColor,
    color: defaultTableTextColor
  }
});

export const MuiTableRow = createStyles({
  root: {
    fontSize: '16px',

    '&:hover': {
      backgroundColor: hoverTableRowBgColor,
      color: hoverTableRowTextColor
    }
  }
});
