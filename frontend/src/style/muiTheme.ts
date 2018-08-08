import { createMuiTheme } from '@material-ui/core';

import {
  MuiButton,
  MuiMenu,
  MuiMenuItem,
  MuiSelect,
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
    MuiSelect,
    MuiMenu,
    MuiMenuItem,
    MuiInput: {
      root: {
        fontSize: '1.6rem'
      }
    },
    MuiInputLabel: {
      root: {
        fontSize: '1.5rem'
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '1.5rem'
      }
    }
  }
});
