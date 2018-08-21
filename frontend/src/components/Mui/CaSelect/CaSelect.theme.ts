import { MenuClassKey } from '@material-ui/core/Menu';
import { MenuItemClassKey } from '@material-ui/core/MenuItem';
import { SelectClassKey } from '@material-ui/core/Select';
import { StyleRules } from '@material-ui/core/styles';

import {
  defaultMenuBgColor,
  defaultMenuItemTextColor,
  defaultSelectIconColor
} from 'style/muiTheme.colors';

export const MuiSelect: Partial<StyleRules<SelectClassKey>> = {
  root: {
    fontSize: '1.6rem',
    color: defaultSelectIconColor
  },
  icon: {
    color: defaultSelectIconColor
  }
};

export const MuiMenu: Partial<StyleRules<MenuClassKey>> = {
  paper: {
    backgroundColor: defaultMenuBgColor
  }
};

export const MuiMenuItem: Partial<StyleRules<MenuItemClassKey>> = {
  root: {
    justifyContent: 'center',
    fontSize: '1.6rem',
    color: defaultMenuItemTextColor
  }
};
