import { createMuiTheme } from '@material-ui/core';

const defaultTextColor = '#f4b33a';
const primaryTextColor = '#000';
const primaryDisabledTextColor = '#000';
const secondaryTextColor = '#fff';

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
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
          color: primaryDisabledTextColor,
          borderColor: primaryDisabledTextColor
        },
      },
      containedSecondary: {
        color: secondaryTextColor
      }
    }
  }
});
