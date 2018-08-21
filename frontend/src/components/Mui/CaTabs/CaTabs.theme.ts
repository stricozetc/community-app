import { TabsClassKey } from '@material-ui/core/Tabs';
import { StyleRules } from '@material-ui/core/styles';

import { defaultIndicatorBgColor, defaultTabsTextColor } from 'style/muiTheme.colors';

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
