import { AppMenuItem } from 'models';

export interface AppMenuProps {
  appMenuItems: AppMenuItem[];
  children?: JSX.Element;
}

export interface AppMenuState {
  anchorEl: HTMLElement | null;
}
