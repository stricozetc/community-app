import { TableClassKey } from '@material-ui/core/Table';
import { TableRowClassKey } from '@material-ui/core/TableRow';
import { StyleRules } from '@material-ui/core/styles';

import {
  defaultTableBgColor,
  defaultTableTextColor,
  hoverTableRowBgColor,
  hoverTableRowTextColor
} from 'style/muiTheme.colors';

export const MuiTable: Partial<StyleRules<TableClassKey>> = {
  root: {
    backgroundColor: defaultTableBgColor,
    color: defaultTableTextColor
  }
};

export const MuiTableRow: Partial<StyleRules<TableRowClassKey>> = {
  root: {
    fontSize: '16px',

    '&:hover': {
      backgroundColor: hoverTableRowBgColor,
      color: hoverTableRowTextColor
    }
  }
};
