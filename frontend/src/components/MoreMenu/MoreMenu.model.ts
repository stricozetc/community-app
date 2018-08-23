import { WithStyles } from '@material-ui/core';

import { MoreMenuItem } from 'models';

import { styles } from './MoreMenu.styles';

export interface MoreMenuProps extends WithStyles<typeof styles> {
  moreMenuItems: MoreMenuItem[];
}

export interface MoreMenuState {
  anchorEl: HTMLElement | null;
}
