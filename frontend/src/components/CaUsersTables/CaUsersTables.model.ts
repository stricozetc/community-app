import { WithStyles } from '@material-ui/core';
import { HeaderName, Row } from 'models';
import { StatisticState } from 'store/statistic/interfaces';

import { styles } from './CaUsersTables.styles';
export interface CaUsersTablesProps extends WithStyles<typeof styles> {
  statistic: StatisticState;
}

export interface CaUsersTablesState {
  value: number;
  rowData: Row[];
  columnDef: HeaderName[];
}
