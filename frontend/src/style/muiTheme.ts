import {
  MuiButton,
  MuiTable,
  MuiTableRow
} from 'components';
import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiButton,
    MuiTable,
    MuiTableRow
  }
});
