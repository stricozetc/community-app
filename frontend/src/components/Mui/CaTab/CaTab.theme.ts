import { TabClassKey } from '@material-ui/core/Tab';
import { StyleRules } from '@material-ui/core/styles';

export const MuiTab: Partial<StyleRules<TabClassKey>> = {
  root: {
    textTransform: 'none',
    marginBottom: '5px'
  },
  label: {
    fontSize: '16px'
  }
};
