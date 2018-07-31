import { SnackbarContentClassKey } from '@material-ui/core/SnackbarContent';
import { StyleRules } from '@material-ui/core/styles';
import { defaultSnackbarTextColor } from 'style/muiTheme.colors';

export const MuiSnackbarContent: Partial<StyleRules<SnackbarContentClassKey>> = {
  root: {
    color: defaultSnackbarTextColor,
    fontSize: '2rem'
  }
};
