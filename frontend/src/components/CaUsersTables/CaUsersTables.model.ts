import { WithStyles } from '@material-ui/core';
import { StatisticState } from 'store/statistic/interfaces';

import { styles } from './CaUsersTables.styles';

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
  activeTab: number;
  rowData: StatisticOfUser[];
  columnDef: HeaderName[];
  tableItemName: string;
}
