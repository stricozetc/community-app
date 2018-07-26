import {
  MuiButton,
  MuiTable,
  MuiTableRow,
  MuiTabs,
  MuiTab,
  MuiSnackbarContent
} from 'components';
import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiButton,
    MuiTable,
    MuiTableRow,
    MuiTabs,
    MuiTab,
    MuiSnackbarContent,
    MuiInput: {
      root: {
        fontSize: '1.6rem'
      }
    }
  }
});
