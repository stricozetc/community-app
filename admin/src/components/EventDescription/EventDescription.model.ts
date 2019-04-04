export interface EventDescriptionProps {
  key: string;
  active: boolean;
  label: string;
  style: string;


  onToggle(blockType: string): void;
}
