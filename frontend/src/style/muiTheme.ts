import { createMuiTheme } from '@material-ui/core';

import {
  MuiButton,
  MuiSnackbarContent,
  MuiTab,
  MuiTable,
  MuiTableRow,
  MuiTabs
} from 'components';

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
