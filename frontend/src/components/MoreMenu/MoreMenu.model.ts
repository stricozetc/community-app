import { MoreMenuItem } from 'models';

export interface MoreMenuProps {
  moreMenuItems: MoreMenuItem[];
}

export interface MoreMenuState {
  anchorEl: HTMLElement | null;
}
