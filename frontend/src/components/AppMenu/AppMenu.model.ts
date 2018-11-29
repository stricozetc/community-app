import { AppMenuItem } from 'models';

export interface AppMenuProps {
  appMenuItems: AppMenuItem[];
  children?: JSX.Element;
  imageUrl?: string;
}

export interface AppMenuState {
  anchorEl: HTMLElement | null;
}
