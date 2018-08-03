import { WithStyles } from '@material-ui/core';
import { StatisticState } from 'store/statistic/interfaces';

import { styles } from './CaUsersTables.styles';

export interface CaUsersTablesProps extends WithStyles<typeof styles> {
  statistic: StatisticState;
}

export interface HeaderName {
  headerName: string;
  field: string;
}

interface CellWithElement {
  name: string;
  edit?: () => void;
  delete?: () => void;
}

export interface Row {
  [key: string]: string | CellWithElement;
}

export interface CaUsersTablesState {
  value: number;
  rowData: Row[];
  columnDef: HeaderName[];
}
