export interface ButtonProps {
  value?: string;
  children?: JSX.Element;
  disabled?: boolean;
  clickHandler?(): void;
}
