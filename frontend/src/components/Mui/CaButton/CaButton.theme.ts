import { ButtonClassKey } from '@material-ui/core/Button';
import { StyleRules } from '@material-ui/core/styles';

import {
  defaultButtonTextColor,
  primaryButtonTextColor,
  secondaryButtonTextColor
} from 'style/muiTheme.colors';

export const MuiButton: Partial<StyleRules<ButtonClassKey>> = {
  root: {
    width: '200px',
    height: '34px',
    border: '1px solid #f4b33a',
    borderRadius: 0,
    backgroundColor: 'transparent',
    color: defaultButtonTextColor,
    textTransform: 'none',
    fontSize: '1.6rem',
    fontWeight: 600,

    '&$disabled': {
      color: defaultButtonTextColor,
      opacity: 0.25
    },
  },
  textPrimary: {
    color: primaryButtonTextColor,
    borderColor: primaryButtonTextColor,

    '&$disabled': {
      color: primaryButtonTextColor,
      borderColor: primaryButtonTextColor
    },
  },
  containedSecondary: {
    color: secondaryButtonTextColor
  }
};
