import { WithStyles } from '@material-ui/core';
import { SelectProps } from '@material-ui/core/Select';
import { i18n } from 'i18next';
// import { languages } from 'models';
import { Omit } from 'utils/Omit';

import { styles } from './CaSelect.styles';

export interface CaSelectProps extends WithStyles<typeof styles>, Omit<SelectProps, 'classes'> {
  values: any[];
  displayedValues: string[];
  currentValue: string;
  handleChange: (event: any, i18n: i18n) => void;
}
