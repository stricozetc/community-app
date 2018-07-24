import {
  defaultTextColor,
  primaryTextColor,
  secondaryTextColor
} from 'style/muiTheme.colors';
import { StyleRules } from '@material-ui/core/styles';
import { ButtonClassKey } from '@material-ui/core/Button';

export const MuiButton: Partial<StyleRules<ButtonClassKey>> = {
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
};
