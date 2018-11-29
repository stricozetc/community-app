import { MoreMenuItem } from 'models';

export interface MoreMenuProps {
  items: MoreMenuItem[];
}

export interface MoreMenuState {
  anchorEl: HTMLElement | null;
}
