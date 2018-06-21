export interface ButtonProps {
  // modificators?: string[];
  value?: string;
  children?: JSX.Element;
  disabled?: boolean;
  clickHandler?(): void;
}
