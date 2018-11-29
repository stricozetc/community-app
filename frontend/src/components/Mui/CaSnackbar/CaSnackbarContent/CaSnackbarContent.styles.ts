import { createStyles } from '@material-ui/core';

import {
  errorSnackbarBgColor,
  infoSnackbarBgColor,
  successSnackbarBgColor,
  warningSnackbarBgColor
} from 'style/muiTheme.colors';

export const styles = createStyles({
  error: {
    backgroundColor: errorSnackbarBgColor
  },
  info: {
    backgroundColor: infoSnackbarBgColor
  },
  warning: {
    backgroundColor: warningSnackbarBgColor
  },
  success: {
    backgroundColor: successSnackbarBgColor
  }
});
