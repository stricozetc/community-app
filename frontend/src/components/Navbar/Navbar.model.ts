export interface NavbarProps {
  modificators?: string[];
  children?: JSX.Element[];
  linksToRender: Link[];
}

export interface Link {
  text?: string;
  to: string;
  activeClassName?: string;
}
