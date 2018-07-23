import { createStyles } from '@material-ui/core';
import {
  defaultTextColor,
  primaryTextColor,
  secondaryTextColor
} from 'style/muiTheme.colors';

export const MuiButton = createStyles({
  root: {
    width: '184px',
    height: '35px',
    border: '1px solid #f4b33a',
    borderRadius: 0,
    backgroundColor: 'transparent',
    color: defaultTextColor,
    textTransform: 'none',
    fontSize: '1.5rem',
    fontWeight: 600,

    '&$disabled': {
      color: defaultTextColor,
      opacity: 0.25
    },
  },
  textPrimary: {
    color: primaryTextColor,
    borderColor: primaryTextColor,

    '&$disabled': {
      color: primaryTextColor,
      borderColor: primaryTextColor
    },
  },
  containedSecondary: {
    color: secondaryTextColor
  }
});
