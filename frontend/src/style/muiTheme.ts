import { createMuiTheme } from '@material-ui/core';

import {
  MuiButton,
  MuiDialog,
  MuiDialogActions,
  MuiDialogContent,
  MuiDialogContentText,
  MuiDialogTitle,
  MuiMenu,
  MuiMenuItem,
  MuiSelect,
  MuiSnackbarContent,
  MuiTab,
  MuiTable,
  MuiTableRow,
  MuiTabs,
  MuiTypography
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
    MuiDialogContent,
    MuiDialogActions,
    MuiDialogContentText,
    MuiTypography,
    MuiDialogTitle,
    MuiDialog,
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
    },
    MuiPaper: {
      root: {
        backgroundColor: '#313c45'
      }
    }
  }
});
