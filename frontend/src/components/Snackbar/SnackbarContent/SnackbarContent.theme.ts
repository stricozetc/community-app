import { StyleRules } from '@material-ui/core/styles';
import { SnackbarContentClassKey } from '@material-ui/core/SnackbarContent';

export const MuiSnackbarContent: Partial<StyleRules<SnackbarContentClassKey>> = {
  root: {
    color: 'white',
    fontSize: '2rem'
  }
};
