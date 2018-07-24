import { defaultIndicatorBgColor, defaultTabsTextColor } from 'style/muiTheme.colors';
import { StyleRules } from '@material-ui/core/styles';
import { TabsClassKey } from '@material-ui/core/Tabs';
import { TabClassKey } from '@material-ui/core/Tab';

export const MuiTabs: Partial<StyleRules<TabsClassKey>> = {
  root: {
    color: defaultTabsTextColor,
    marginLeft: '82px'
  },
  indicator: {
    backgroundColor: defaultIndicatorBgColor,
    height: '4px'
  }
};

export const MuiTab: Partial<StyleRules<TabClassKey>> = {
  root: {
    textTransform: 'none',
    marginBottom: '5px'
  },
  label: {
    fontSize: '16px'
  }
};
