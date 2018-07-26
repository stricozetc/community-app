import { styles } from './CaUsersTables.styles';
import { WithStyles } from '@material-ui/core';
import { StatisticState } from 'store/statistic/interfaces';

export interface CaUsersTablesProps extends WithStyles<typeof styles> {
  statistic: StatisticState;
}

export interface StatisticOfUser {
  [key: string]: string | number | boolean | undefined;
}

export interface HeaderName {
  headerName: string;
  field: string;
}

export interface CaUsersTablesState {
  value: number;
  rowData: StatisticOfUser[];
  columnDef: HeaderName[];
}
