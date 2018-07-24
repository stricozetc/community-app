import { createStyles } from '@material-ui/core';
import { defaultIndicatorBgColor, defaultTabsTextColor } from 'style/muiTheme.colors';

export const MuiTabs = createStyles({
  root: {
    color: defaultTabsTextColor,
    marginLeft: '82px'
  },
  indicator: {
    backgroundColor: defaultIndicatorBgColor,
    height: '4px'
  }
});

export const MuiTab = createStyles({
  root: {
    textTransform: 'none',
    marginBottom: '5px'
  },
  label: {
    fontSize: '16px'
  }
});
