export interface NavbarProps {
  children?: JSX.Element[] | JSX.Element;
  linksToRender?: Link[];
}

export interface Link {
  text?: string;
  to: string;
  activeClassName?: string;
  disabled: boolean;
}
