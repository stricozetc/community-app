import { SelectProps } from '@material-ui/core/Select';
import { i18n } from 'i18next';

export interface CaSelectProps extends SelectProps {
  values: string[];
  displayedValues: string[];
  currentValue: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>, i18n: i18n) => void;
}
