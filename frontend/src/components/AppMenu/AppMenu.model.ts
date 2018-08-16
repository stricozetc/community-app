import { WithStyles } from '@material-ui/core';

import { AppMenuItem } from 'models';

import { styles } from './AppMenu.styles';

export interface AppMenuProps extends WithStyles<typeof styles> {
  appMenuItems: AppMenuItem[];
  children?: JSX.Element;
}

export interface AppMenuState {
  anchorEl: HTMLElement | null;
}
